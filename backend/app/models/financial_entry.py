from app.extensions import db
from app.models.base_model import BaseModel
from app.enums.entry_type import EntryType


class FinancialEntry(BaseModel):
    __tablename__ = "financial_entries"

    financial_month_id = db.Column(
        db.Integer,
        db.ForeignKey("financial_months.id"),
        nullable=False
    )

    entry_type = db.Column(
        db.Enum(EntryType),
        nullable=False
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("expense_categories.id"),
        nullable=True
    )

    title = db.Column(
        db.String(150),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    amount = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    currency = db.Column(
        db.String(3),
        nullable=False,
        default="SYP"
    )

    notes = db.Column(
        db.Text,
        nullable=True
    )

    financial_month = db.relationship(
        "FinancialMonth",
        back_populates="entries"
    )

    category = db.relationship(
        "ExpenseCategory",
        back_populates="entries"
    )

    def __repr__(self):
        return f"<FinancialEntry {self.id}>"