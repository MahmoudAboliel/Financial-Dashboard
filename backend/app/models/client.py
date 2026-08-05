from app.extensions import db
from app.models.base_model import BaseModel


class Client(BaseModel):
    __tablename__ = "clients"

    full_name = db.Column(
        db.String(150),
        nullable=False
    )

    phone = db.Column(
        db.String(30),
        nullable=True
    )

    email = db.Column(
        db.String(120),
        nullable=True,
        unique=True
    )

    notes = db.Column(
        db.Text,
        nullable=True
    )

    financial_months = db.relationship(
        "FinancialMonth",
        back_populates="client",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Client {self.id}: {self.full_name}>"