from app.extensions import db
from app.models.base_model import BaseModel


class ExpenseCategory(BaseModel):
    __tablename__ = "expense_categories"

    code = db.Column(
        db.String(50),
        nullable=False,
        unique=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    display_order = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    color = db.Column(
        db.String(20),
        nullable=True
    )

    icon = db.Column(
        db.String(50),
        nullable=True
    )

    entries = db.relationship(
        "FinancialEntry",
        back_populates="category"
    )

    def __repr__(self):
        return f"<ExpenseCategory {self.name}>"