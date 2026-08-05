
from app.services.client_service import (
    get_all_clients,
    get_client_by_id,
    get_client_months
)
from app.utils.api_response import (
    success_response,
    error_response
)
from app.services.report_service import build_report_json

def get_clients():

    clients = get_all_clients()

    result = []

    for client in clients:

        reports = [
            month.report
            for month in client.financial_months
            if month.report
        ]

        total_income = sum(
            float(report.total_income)
            for report in reports
        )

        total_expenses = sum(
            float(report.total_expenses)
            for report in reports
        )

        total_savings = sum(
            float(report.savings)
            for report in reports
        )

        average_savings_rate = (
            sum(
                float(report.savings_rate)
                for report in reports
            ) / len(reports)
            if reports
            else 0
        )

        # آخر شهر مالي للعميل
        latest_month = (
            max(
                client.financial_months,
                key=lambda month: (month.year, month.month)
            )
            if client.financial_months
            else None
        )

        latest_report = (
            latest_month.report
            if latest_month
            else None
        )

        result.append({
            "id": client.id,
            "full_name": client.full_name,
            "phone": client.phone,
            "email": client.email,

            "months_count": len(
                client.financial_months
            ),

            "financial": {
                "total_income": total_income,
                "total_expenses": total_expenses,
                "total_savings": total_savings,
                "average_savings_rate": round(
                    average_savings_rate,
                    2
                )
            },

            "latest_report": {
                "year": latest_month.year,
                "month": latest_month.month,
                "savings_rate": float(
                    latest_report.savings_rate
                ),
                "verdict": latest_report.verdict
            } if latest_report and latest_month else None
        })

    return success_response(
        data=result,
        message="Clients retrieved successfully."
    )

def get_client_details(client_id):
    
    client = get_client_by_id(client_id)
    
    if not client:
        return error_response(message="Client not found.", status_code=404)
        
    months = []
    
    for month in client.financial_months:
        
        report = month.report
        
        months.append({
            "id": month.id,
            "year": month.year,
            "month": month.month,
            "status": month.status,
            
            "report": {
                "total_income": float(report.total_income),    
                "total_expenses": float(report.total_expenses),    
                "savings": float(report.savings),    
                "savings_rate": float(report.savings_rate),    
                "verdict": report.verdict,    
                "insight": report.insight,    
            } if report else None
        })
        
        
    result = {
        "id": client.id,
        "full_name": client.full_name,
        "phone": client.phone,
        "email": client.email,
        "notes": client.notes,
        "financial_months": months,
        # "test": ss
    }
    
    return success_response(data=result, message="Client retrieved successfully.")


def get_months(client_id):

    months = get_client_months(client_id)

    if months is None:

        return error_response(
            "Client not found.",
            404
        )

    return success_response(
        data=months,
        message="Financial months retrieved successfully."
    )