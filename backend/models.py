# from sqlalchemy import Column, Integer, String
# from database import engine
# from sqlalchemy.orm import declarative_base

# Base = declarative_base()

# class Employee(Base):
#     __tablename__ = "employees"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     role = Column(String)

# Base.metadata.create_all(bind=engine)

from sqlalchemy import Column, Integer, String
from database import engine
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    performance_rating = Column(Integer)
    skill = Column(String)
    training_completed = Column(String)

Base.metadata.create_all(bind=engine)