from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    password = Column(String(255), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    coordinate_history = relationship('CoordinateHistory', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User "{self.username}">'
    
class Coordinate(db.Model):
    __tablename__ = 'coordinate'

    id = Column(Integer, primary_key=True)
    latitude = Column(Integer, nullable=False)
    longitude = Column(Integer, nullable=False)
    label = Column(String(50), nullable=False)
    timestamp = Column(DateTime)
    user_id = Column(String(50), ForeignKey('users.id'))

    __table_args__ = (
        db.UniqueConstraint('id', name='coords_id'),
    )
    
    
    def __repr__(self):
        return f'<Label "{self.label}">'