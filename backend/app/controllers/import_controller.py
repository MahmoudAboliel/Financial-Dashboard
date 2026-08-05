from flask import jsonify
from flask import request

from app.services.import_service import import_json_file
from app.utils.api_response import (
    success_response,
    error_response
)

def import_json():

    if "file" not in request.files:
        return error_response(message="No file uploaded.", status_code=400)

    file = request.files["file"]

    result = import_json_file(file)

    return success_response(data=result, message="File uploaded successuflly.")