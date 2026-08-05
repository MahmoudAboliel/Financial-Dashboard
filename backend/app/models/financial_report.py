from app.extensions import db
from app.models.base_model import BaseModel


class FinancialReport(BaseModel):
    __tablename__ = "financial_reports"

    financial_month_id = db.Column(
        db.Integer,
        db.ForeignKey("financial_months.id"),
        nullable=False,
        unique=True
    )

    total_income = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    total_expenses = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    savings = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    savings_rate = db.Column(
        db.Numeric(5, 2),
        nullable=False
    )

    verdict = db.Column(
        db.String(30),
        nullable=False
    )

    insight = db.Column(
        db.Text,
        nullable=True
    )

    financial_month = db.relationship(
        "FinancialMonth",
        back_populates="report"
    )

    def __repr__(self):
        return f"<FinancialReport {self.id}>"