from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


"""
Remove Note

Add one Module class or three classes?
* Credit Modules
* Attempt Modules
* Planning Modules

"""


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# User had an account
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    notes = db.relationship('Note')

# User signed up
class GuestUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    student_id = db.Column(db.String(150))
    portal_id = db.Column(db.String(150))
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))

# Able to create account
class Admin(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    guest_user = db.relationship('GuestUser')
