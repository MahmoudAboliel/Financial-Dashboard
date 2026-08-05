from app.extensions import db
from app.models.financial_entry import FinancialEntry
from app.models.expense_category import ExpenseCategory
from app.enums.entry_type import EntryType


def create_income_entries(financial_month_id, incomes):

    for income in incomes:

        entry = FinancialEntry(
            financial_month_id=financial_month_id,
            entry_type=EntryType.INCOME,
            title=income["source"],
            amount=income["amount"],
            currency="SYP"
        )

        db.session.add(entry)



def create_expense_entries(financial_month_id, expenses):

    for expense in expenses:

        category = ExpenseCategory.query.filter_by(
            name=expense["category"]
        ).first()

        if not category:
            category = ExpenseCategory.query.filter_by(
                code="OTHER"
            ).first()


        entry = FinancialEntry(
            financial_month_id=financial_month_id,
            entry_type=EntryType.EXPENSE,
            category_id=category.id,
            title=expense["category"],
            amount=expense["amount"],
            currency="SYP"
        )

        db.session.add(entry)