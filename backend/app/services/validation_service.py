def validate_json(data):

    if "clients" not in data:
        return False, "Missing 'clients' field."

    if not isinstance(data["clients"], list):
        return False, "'clients' must be a list."

    return True, None