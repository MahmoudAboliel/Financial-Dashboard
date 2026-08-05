from app.models.financial_entry import FinancialEntry
from app.models.financial_report import FinancialReport


def clear_month_data(financial_month_id):

    FinancialEntry.query.filter_by(
        financial_month_id=financial_month_id
    ).delete()


    FinancialReport.query.filter_by(
        financial_month_id=financial_month_id
    ).delete()