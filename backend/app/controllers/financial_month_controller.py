from app.utils.api_response import success_response, error_response
from app.services.financial_month_service import (
    get_all_financial_months,
    get_financial_month_by_id
)
from app.services.report_service import build_report_json
import json
from flask import Response
from datetime import datetime


def get_financial_months():
    
    months = get_all_financial_months()
    
    data = []

    for month in months:

        data.append({
            "id": month.id,
            "client_id": month.client_id,
            "year": month.year,
            "month": month.month,
            "status": month.status
        })


    return success_response(
        data,
        "Financial months retrieved successfully."
    )
    

def get_financial_month(month_id):

    month = get_financial_month_by_id(month_id)

    if not month:
        return error_response(
            "Financial month not found.",
            404
        )


    return success_response(
        {
            "id": month.id,
            "client_id": month.client_id,
            "year": month.year,
            "month": month.month,
            "status": month.status
        }
    )
    
    

def get_financial_report(financial_month_id):
    
    report = build_report_json(financial_month_id)
    
    if not report:
        return error_response("Financial month not found.", 404)
    
    return success_response(data=report, message="Financial report retrieved successfully.")


def download_financial_report(financial_month_id):
    
    report = build_report_json(financial_month_id)
    
    if report is None:
        return error_response(
            "Financial month not found.",
            404
        )
        
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    filename = (f"financial_report_{financial_month_id}_{timestamp}.json")
    
    json_data = json.dumps(
        report,
        indent=4,
        ensure_ascii=False
    )
    
    return Response(
        json_data,
        mimetype="application/json",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
    )