from app.services.dashboard_service import (
    build_dashboard
)
from app.utils.api_response import success_response

def dashboard_data():
    
    dashboard = build_dashboard()
        
    return success_response(data=dashboard, message="Dashboard data retrieved successfully.")