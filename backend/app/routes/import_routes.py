from flask import Blueprint

from app.controllers.import_controller import import_json


import_bp = Blueprint(
    "import",
    __name__,
    url_prefix="/api/import"
)

import_bp.route(
    "",
    methods=["POST"]
)(import_json)