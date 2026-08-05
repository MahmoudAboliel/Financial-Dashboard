from flask import Flask

from app.config.config import DevelopmentConfig 
from app.extensions import db
from app.extensions import migrate
from app.extensions import ma
from app.extensions import cors


def create_app():

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    migrate.init_app(app, db)

    ma.init_app(app)

    cors.init_app(app)
    
    from app import models
    
    from app.database.seed import seed_expense_categories
    
    @app.cli.command("seed")
    def seed():
        seed_expense_categories()
        
    from app.utils.api_response import error_response
    
    @app.errorhandler(404)
    def not_found(error):
        return error_response(message="Resource not found.", status_code=404)
    
    @app.errorhandler(500)
    def server_error(error):
        return error_response(message="Internal server error.", status_code=500)
    
    from app.routes.dashboard_routes import dashboard_bp
    from app.routes.import_routes import import_bp
    from app.routes.client_routes import client_bp
    from app.routes.financial_month_routes import financial_month_bp
    
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(import_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(financial_month_bp)

    return app