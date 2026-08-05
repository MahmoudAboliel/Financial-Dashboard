from flask import Blueprint

from app.controllers.financial_month_controller import (
    get_financial_months,
    get_financial_month,
    get_financial_report,
    download_financial_report
)

financial_month_bp = Blueprint(
    "financial_months",
    __name__,
    url_prefix="/api/financial-months"
)

financial_month_bp.route(
    "",
    methods=["GET"]
)(get_financial_months)

financial_month_bp.route(
    "/<int:month_id>",
    methods=["GET"]
)(get_financial_month)

financial_month_bp.route(
    "/<int:financial_month_id>/report",
    methods=["GET"]
)(get_financial_report)

financial_month_bp.route(
    "/<int:financial_month_id>/report/download",
    methods=["GET"]
)(download_financial_report)