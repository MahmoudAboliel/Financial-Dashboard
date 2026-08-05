from sqlalchemy import func

from app.models.client import Client
from app.models.financial_month import FinancialMonth
from app.models.financial_entry import FinancialEntry
from app.models.financial_report import FinancialReport
from app.models.expense_category import ExpenseCategory
from app.enums.entry_type import EntryType
from app.constants.financial_verdict import FinancialVerdict
from app.extensions import db

def get_summary():
    
    clients_count = Client.query.count()
    
    financial_months_count = FinancialMonth.query.count()
    
    reports_count = FinancialReport.query.count()
    
    income_entries_count = FinancialEntry.query.filter_by(
        entry_type=EntryType.INCOME
    ).count()
    
    expense_entries_count = FinancialEntry.query.filter_by(
        entry_type=EntryType.EXPENSE
    ).count()
    
    return {
        "clients_count": clients_count,
        "financial_months_count": financial_months_count,
        "reports_count": reports_count,
        "income_entries_count": income_entries_count,
        "expense_entries_count": expense_entries_count
    }
    

def get_financial_statistics():
    
    result = db.session.query(
        func.sum(FinancialReport.total_income),
        func.sum(FinancialReport.total_expenses),
        func.sum(FinancialReport.savings),
        func.avg(FinancialReport.savings_rate),
        func.max(FinancialReport.savings_rate),
        func.min(FinancialReport.savings_rate),
    ).first()
    
    total_income = result[0] or 0
    total_expenses = result[1] or 0
    total_savings = result[2] or 0
    average_savings_rate = result[3] or 0
    highest_savings_rate = result[4] or 0
    lowest_savings_rate = result[5] or 0
    
    return {
        "total_income": float(total_income),
        "total_expenses": float(total_expenses),
        "total_savings": float(total_savings),

        "average_savings_rate": round(
            float(average_savings_rate), 2
        ),

        "highest_savings_rate": round(
            float(highest_savings_rate), 2
        ),

        "lowest_savings_rate": round(
            float(lowest_savings_rate), 2
        )
    }
    
    
def get_verdict_distribution():
    
    verdicts = {
        status.value: 0 for status in FinancialVerdict
    }
    
    result = (
        db.session.query(
            FinancialReport.verdict,
            func.count(FinancialReport.id)
        )
        .group_by(FinancialReport.verdict)
        .all()
    )
    
    for verdict, count in result:
        verdicts[verdict] = count
    
    return [
        {
            "verdict": verdict,
            "count": count
        } for verdict, count in verdicts.items()
    ]
    

def get_expense_distribution():
    
    categories_default = {
        category.name: {
            "total": 0,
            "percentage": 0
        } for category in ExpenseCategory.query.all()
    }
    
    total_expenses = (
        db.session.query(
            func.sum(FinancialEntry.amount)
        )
        .filter(
            FinancialEntry.entry_type == EntryType.EXPENSE.value
        )
        .scalar()
    ) or 0
    
    categories = (
        db.session.query(
            ExpenseCategory.name,
            func.sum(FinancialEntry.amount)
        )
        .join(
            FinancialEntry,
            FinancialEntry.category_id == ExpenseCategory.id
        )
        .filter(
            FinancialEntry.entry_type == EntryType.EXPENSE.value
        )
        .group_by(
            ExpenseCategory.name
        )
        .all()
    )
    
    for category, total in categories:
        
        categories_default[category]["total"] = float(total)
        categories_default[category]["percentage"] = round(
            (float(total) / float(total_expenses) * 100) if total_expenses > 0 else 0,
            2
        )
        
    
    return [
        {
            "category": category,
            **data
        }
        for category, data in categories_default.items()
    ]
    
    
def get_income_vs_expenses():

    result = (
        db.session.query(
            func.sum(
                FinancialReport.total_income
            ),
            func.sum(
                FinancialReport.total_expenses
            )
        )
        .first()
    )

    total_income = result[0] or 0
    total_expenses = result[1] or 0

    return {
        "income": float(total_income),
        "expenses": float(total_expenses),
        "balance": float(total_income - total_expenses)
    }
    
    
def get_monthly_average_savings():

    result = (
        db.session.query(
            FinancialMonth.year,
            FinancialMonth.month,
            func.avg(
                FinancialReport.savings_rate
            )
        )
        .join(
            FinancialReport,
            FinancialReport.financial_month_id == FinancialMonth.id
        )
        .group_by(
            FinancialMonth.year,
            FinancialMonth.month
        )
        .order_by(
            FinancialMonth.year,
            FinancialMonth.month
        )
        .all()
    )


    return [
        {
            "month": f"{year}-{month:02d}",
            "average_savings_rate": round(
                float(rate), 
                2
            )
        }
        for year, month, rate in result
    ]
    

# def get_top_clients(limit=5):

#     best_clients = (
#         db.session.query(
#             Client.full_name,
#             FinancialReport.savings_rate,
#             FinancialReport.verdict
#         )
#         .join(
#             FinancialMonth,
#             FinancialMonth.client_id == Client.id
#         )
#         .join(
#             FinancialReport,
#             FinancialReport.financial_month_id == FinancialMonth.id
#         )
#         .order_by(
#             FinancialReport.savings_rate.desc()
#         )
#         .limit(limit)
#         .all()
#     )


#     worst_clients = (
#         db.session.query(
#             Client.full_name,
#             FinancialReport.savings_rate,
#             FinancialReport.verdict
#         )
#         .join(
#             FinancialMonth,
#             FinancialMonth.client_id == Client.id
#         )
#         .join(
#             FinancialReport,
#             FinancialReport.financial_month_id == FinancialMonth.id
#         )
#         .order_by(
#             FinancialReport.savings_rate.asc()
#         )
#         .limit(limit)
#         .all()
#     )


#     return {
#         "best_clients": [
#             {
#                 "client": name,
#                 "savings_rate": float(rate),
#                 "verdict": verdict
#             }
#             for name, rate, verdict in best_clients
#         ],

#         "worst_clients": [
#             {
#                 "client": name,
#                 "savings_rate": float(rate),
#                 "verdict": verdict
#             }
#             for name, rate, verdict in worst_clients
#         ]
#     }

def get_top_clients(limit=3):

    client_statistics = (
        db.session.query(
            Client.full_name,

            func.count(
                FinancialMonth.id
            ).label("months_count"),

            func.avg(
                FinancialReport.savings_rate
            ).label("average_rate"),

            func.sum(
                FinancialReport.total_income
            ).label("total_income"),

            func.sum(
                FinancialReport.total_expenses
            ).label("total_expenses"),

            func.sum(
                FinancialReport.savings
            ).label("total_savings")
        )
        .join(
            FinancialMonth,
            FinancialMonth.client_id == Client.id
        )
        .join(
            FinancialReport,
            FinancialReport.financial_month_id == FinancialMonth.id
        )
        .group_by(
            Client.id,
            Client.full_name
        )
    )


    best_clients = (
        client_statistics
        .order_by(
            func.avg(
                FinancialReport.savings_rate
            ).desc()
        )
        .limit(limit)
        .all()
    )


    worst_clients = (
        client_statistics
        .order_by(
            func.avg(
                FinancialReport.savings_rate
            ).asc()
        )
        .limit(limit)
        .all()
    )


    def serialize(client):
        return {
            "client": client.full_name,
            "months_count": client.months_count,
            "average_savings_rate": round(
                float(client.average_rate),
                2
            ),
            "total_income": float(
                client.total_income or 0
            ),
            "total_expenses": float(
                client.total_expenses or 0
            ),
            "total_savings": float(
                client.total_savings or 0
            )
        }


    return {
        "best_clients": [
            serialize(client)
            for client in best_clients
        ],
        "worst_clients": [
            serialize(client)
            for client in worst_clients
        ]
    }
    

def get_recent_activity(limit=10):

    activities = []

    recent_months = (
        db.session.query(
            FinancialMonth.id,
            Client.full_name,
            FinancialMonth.year,
            FinancialMonth.month,
            FinancialMonth.created_at
        )
        .join(
            Client,
            Client.id == FinancialMonth.client_id
        )
        .order_by(
            FinancialMonth.created_at.desc()
        )
        .limit(limit)
        .all()
    )


    for item in recent_months:
        activities.append(
            {
                "type": "financial_month",
                "description": (
                    f"Financial data uploaded for {item.full_name}"
                ),
                "client": item.full_name,
                "month": f"{item.year}-{item.month:02d}",
                "created_at": item.created_at.isoformat()
            }
        )


    recent_clients = (
        Client.query
        .order_by(
            Client.created_at.desc()
        )
        .limit(limit)
        .all()
    )


    for client in recent_clients:
        activities.append(
            {
                "type": "client",
                "description": (
                    f"New client added: {client.full_name}"
                ),
                "client": client.full_name,
                "created_at": client.created_at.isoformat()
            }
        )


    activities.sort(
        key=lambda x: x["created_at"],
        reverse=True
    )


    return activities[:limit]


def build_dashboard():

    return {
        "summary": get_summary(),

        "financial": get_financial_statistics(),

        "charts": {
            "verdict_distribution": get_verdict_distribution(),

            "expense_categories": get_expense_distribution(),

            "income_vs_expenses": get_income_vs_expenses(),

            "monthly_average_savings": get_monthly_average_savings()
        },

        "top_clients": get_top_clients(),

        "recent_activity": get_recent_activity()
    }