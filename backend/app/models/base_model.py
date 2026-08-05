from datetime import datetime

from app.extensions import db


class BaseModel(db.Model):

    __abstract__ = True

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.now,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        nullable=False
    )

    deleted_at = db.Column(
        db.DateTime,
        nullable=True
    )

    @property
    def is_deleted(self):

        return self.deleted_at is not None

    def soft_delete(self):

        self.deleted_at = datetime.now()

    def restore(self):

        self.deleted_at = None