import json
from app.extensions import db
from app.services.validation_service import validate_json
from app.services.client_service import get_or_create_client
from app.services.financial_month_service import create_financial_month
from app.services.financial_entry_service import (
    create_income_entries,
    create_expense_entries
)
from app.services.report_service import generate_financial_report
from app.services.clear_month_data_service import clear_month_data


def import_json_file(file):

    try:

        data = json.load(file)
        
        valid, error = validate_json(data)
        
        if not valid:
            return {
                "success": False,
                "message": error
            }
        
        for client_data in data["clients"]:
            print('client: ', client_data['client_name'])
            
            client = get_or_create_client(client_data["client_name"])
            
            financial_month = create_financial_month(client.id, client_data["month"])
            
            clear_month_data(financial_month.id)
            
            create_income_entries(financial_month.id, client_data["income"])
            
            create_expense_entries(financial_month.id, client_data["expenses"])
            
            generate_financial_report(financial_month.id)
        
        db.session.commit()
        
        return True

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }