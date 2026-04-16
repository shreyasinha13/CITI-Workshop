# from sqlalchemy import Column, Integer, String
# from database import engine
# from sqlalchemy.orm import declarative_base

# Base = declarative_base()

# class Employee(Base):
#     __tablename__ = "employees"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     role = Column(String)
#     performance_rating = Column(Integer)
#     skill = Column(String)
#     training_completed = Column(String)

# Base.metadata.create_all(bind=engine)


from sqlalchemy import Column, Integer, String, ForeignKey
from database import engine
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    performance_rating = Column(Integer)
    skill = Column(String)
    training_completed = Column(String)

    reviews = relationship("PerformanceReview", back_populates="employee")
    development_plans = relationship(
        "DevelopmentPlan", back_populates="employee")
    competencies = relationship("Competency", back_populates="employee")
    trainings = relationship("TrainingRecord", back_populates="employee")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="employee")


class PerformanceReview(Base):
    __tablename__ = "performance_reviews"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    rating = Column(Integer)
    feedback = Column(String)
    review_date = Column(String)

    employee = relationship("Employee", back_populates="reviews")


class DevelopmentPlan(Base):
    __tablename__ = "development_plans"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    goal = Column(String)
    progress = Column(String)
    deadline = Column(String)

    employee = relationship("Employee", back_populates="development_plans")


class Competency(Base):
    __tablename__ = "competencies"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    skill = Column(String)
    level = Column(String)

    employee = relationship("Employee", back_populates="competencies")


class TrainingRecord(Base):
    __tablename__ = "training_records"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    training_name = Column(String)
    status = Column(String)
    date = Column(String)

    employee = relationship("Employee", back_populates="trainings")


Base.metadata.create_all(bind=engine)