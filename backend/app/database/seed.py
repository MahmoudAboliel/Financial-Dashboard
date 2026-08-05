from app.extensions import db
from app.models.expense_category import ExpenseCategory


def seed_expense_categories():

    categories = [
        {
            "code": "RENT",
            "name": "Rent",
            "display_order": 1,
            "color": "#EF4444",
            "icon": "home",
        },
        {
            "code": "FOOD",
            "name": "Food",
            "display_order": 2,
            "color": "#22C55E",
            "icon": "utensils",
        },
        {
            "code": "TRANSPORT",
            "name": "Transport",
            "display_order": 3,
            "color": "#3B82F6",
            "icon": "car",
        },
        {
            "code": "ENTERTAINMENT",
            "name": "Entertainment",
            "display_order": 4,
            "color": "#A855F7",
            "icon": "film",
        },
        {
            "code": "OTHER",
            "name": "Other",
            "display_order": 5,
            "color": "#6B7280",
            "icon": "circle",
        },
    ]

    for category in categories:

        exists = ExpenseCategory.query.filter_by(
            code=category["code"]
        ).first()

        if not exists:
            db.session.add(
                ExpenseCategory(**category)
            )

    db.session.commit()

    print("Expense categories seeded successfully.")