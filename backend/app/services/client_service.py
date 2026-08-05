from app.extensions import db
from app.models.client import Client


def get_or_create_client(client_name):

    client = Client.query.filter_by(
        full_name=client_name
    ).first()

    if client:
        return client

    client = Client(
        full_name=client_name
    )

    db.session.add(client)
    db.session.flush()

    return client

def get_all_clients():
    
    clients = Client.query.all()
    
    return clients

def get_client_by_id(client_id):
    return Client.query.get(client_id)

def get_client_months(client_id):
    
    client = Client.query.get(client_id)
    
    if not client:
        return None
    
    months = sorted(
        client.financial_months,
        key=lambda month: (
            month.year,
            month.month
        ),
        reverse=True
    )
    
    return [
        {
            "id": month.id,
            "year": month.year,
            "month": month.month,
            "status": month.status
        } for month in months
    ]