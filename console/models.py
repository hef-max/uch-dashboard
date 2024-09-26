from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime
import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    password = Column(String(255), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    
    def __repr__(self):
        return f'<User "{self.username}">'