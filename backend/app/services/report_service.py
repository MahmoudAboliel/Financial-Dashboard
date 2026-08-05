from decimal import Decimal

from app.extensions import db
from app.models.financial_entry import FinancialEntry
from app.models.financial_report import FinancialReport
from app.enums.entry_type import EntryType
from app.models.financial_month import FinancialMonth
from app.constants.financial_verdict import FinancialVerdict

def generate_financial_report(financial_month_id):

    entries = FinancialEntry.query.filter_by(
        financial_month_id=financial_month_id
    ).all()


    total_income = Decimal("0")
    total_expenses = Decimal("0")


    for entry in entries:

        if entry.entry_type == EntryType.INCOME:
            total_income += entry.amount

        else:
            total_expenses += entry.amount


    savings = total_income - total_expenses


    if total_income == 0:
        savings_rate = Decimal("0")
        verdict = "No Income"
        insight = "Client has no income recorded."

    else:

        savings_rate = (savings / total_income) * 100

        verdict, insight = calculate_verdict(savings_rate)
        

    report = FinancialReport(
        financial_month_id=financial_month_id,
        total_income=total_income,
        total_expenses=total_expenses,
        savings=savings,
        savings_rate=savings_rate,
        verdict=verdict,
        insight=insight
    )


    db.session.add(report)

    return report


def calculate_verdict(savings_rate):
    
    if savings_rate > 20:
        verdict = FinancialVerdict.EXCELLENT.value
        insight = "Strong financial health with good savings."

    elif savings_rate >= 10:
        verdict = FinancialVerdict.GOOD.value
        insight = "Positive saving behavior."

    elif savings_rate >= 0:
        verdict = FinancialVerdict.NEEDS_IMPROVEMENT.value
        insight = "Savings are low and expenses should be reviewed."

    else:
        verdict = FinancialVerdict.DEFICIT.value
        insight = "Expenses exceed income."
        
    return verdict, insight


def get_category_breakdown(financial_month_id):
    
    expenses = FinancialEntry.query.filter_by(
        financial_month_id= financial_month_id,
        entry_type=EntryType.EXPENSE
    ).all()
    
    total_expenses = sum(expense.amount for expense in expenses)
    
    categories = {}
    
    for expense in expenses:
        
        name = expense.category.name
        
        categories[name] = (
            categories.get(name, Decimal("0"))
            + expense.amount
        )
        
    result = []
    
    for category, amount in categories.items():
        
        percentage = 0
        
        if total_expenses > 0:
            percentage = round(
                (amount / total_expenses) * 100,
                2
            )
            
        result.append({
            "category": category,
            "total": float(amount),
            "percentage": float(percentage),
            "notes": expense.notes
        })
        
    return result
        
        
def build_report_json(financial_month_id):

    financial_month = FinancialMonth.query.get(financial_month_id)

    if not financial_month:
        return None

    report = financial_month.report

    income_entries = FinancialEntry.query.filter_by(
        financial_month_id=financial_month.id,
        entry_type=EntryType.INCOME
    ).all()

    return {
        "client": {
            "id": financial_month.client.id,
            "full_name": financial_month.client.full_name,
            "phone": financial_month.client.phone,
            "email": financial_month.client.email
        },

        "month": {
            "year": financial_month.year,
            "month": financial_month.month
        },

        "summary": {
            "total_income": float(report.total_income),
            "total_expenses": float(report.total_expenses),
            "savings": float(report.savings),
            "savings_rate": float(report.savings_rate),
            "verdict": report.verdict,
            "insight": report.insight
        },

        "expense_breakdown": get_category_breakdown(financial_month.id),

        "income": [
            {
                "source": entry.title,
                "amount": float(entry.amount)
            }
            for entry in income_entries
        ],

    }