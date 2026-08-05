from flask import Blueprint
from app.controllers.client_controller import (
    get_clients,
    get_client_details,
    get_months
)


client_bp = Blueprint(
    "clients",
    __name__,
    url_prefix="/api/clients"
)

client_bp.route(
    "",
    methods=["GET"]
)(get_clients)

client_bp.route(
    "/<int:client_id>",
    methods=["GET"]
)(get_client_details)

client_bp.route(
    "/<int:client_id>/months",
    methods=["GET"]
)(get_months)