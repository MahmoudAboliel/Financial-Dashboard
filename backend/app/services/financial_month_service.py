from app.extensions import db
from app.models.financial_month import FinancialMonth


def create_financial_month(client_id, month_string):

    year, month = month_string.split("-")

    financial_month = FinancialMonth.query.filter_by(
        client_id=client_id,
        year=int(year),
        month=int(month)
    ).first()

    if financial_month:
        return financial_month

    financial_month = FinancialMonth(
        client_id=client_id,
        year=int(year),
        month=int(month),
        status="IMPORTED"
    )

    db.session.add(financial_month)
    db.session.flush()

    return financial_month

def get_all_financial_months():

    return FinancialMonth.query.all()

def get_financial_month_by_id(month_id):

    return FinancialMonth.query.get(month_id)
