from os import getenv

from dotenv import load_dotenv

load_dotenv()

print("DATABASE:", getenv("DATABASE_URL"))

class BaseConfig:

    SECRET_KEY = getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JSON_SORT_KEYS = False


class DevelopmentConfig(BaseConfig):

    DEBUG = True


class ProductionConfig(BaseConfig):

    DEBUG = False


class TestingConfig(BaseConfig):

    TESTING = True