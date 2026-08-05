from app.extensions import db
from app.models.base_model import BaseModel


class FinancialMonth(BaseModel):
    __tablename__ = "financial_months"

    client_id = db.Column(
        db.Integer,
        db.ForeignKey("clients.id"),
        nullable=False
    )

    year = db.Column(
        db.Integer,
        nullable=False
    )

    month = db.Column(
        db.Integer,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="DRAFT"
    )

    client = db.relationship(
        "Client",
        back_populates="financial_months"
    )
    
    entries = db.relationship(
        "FinancialEntry",
        back_populates="financial_month",
        cascade="all, delete-orphan"
    )
    
    report = db.relationship(
        "FinancialReport",
        back_populates="financial_month",
        uselist=False,
        cascade="all, delete-orphan"
    )

    __table_args__ = (
        db.UniqueConstraint(
            "client_id",
            "year",
            "month",
            name="uq_client_month"
        ),
    )