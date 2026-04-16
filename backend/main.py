from fastapi import HTTPException
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

# CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend running"}


# Create employee
@app.post("/employees", response_model=schemas.EmployeeResponse)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = models.Employee(
        name=emp.name,
        role=emp.role,
        performance_rating=emp.performance_rating,
        skill=emp.skill,
        training_completed=emp.training_completed
    )
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp


# Get employees (filters + pagination + sorting)
@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(
    name: str = None,
    role: str = None,
    skill: str = None,
    skip: int = 0,
    limit: int = 10,
    sort_by: str = None,
    order: str = "asc",
    db: Session = Depends(get_db)
):
    query = db.query(models.Employee)

    # Filters
    if name:
        query = query.filter(models.Employee.name.ilike(f"%{name}%"))

    if role:
        query = query.filter(models.Employee.role.ilike(f"%{role}%"))

    if skill:
        query = query.filter(models.Employee.skill.ilike(f"%{skill}%"))

    # Sorting
    if sort_by:
        column = getattr(models.Employee, sort_by, None)
        if column is not None:
            if order == "desc":
                query = query.order_by(column.desc())
            else:
                query = query.order_by(column.asc())

    # Pagination
    return query.offset(skip).limit(limit).all()


# Update employee
@app.put("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(emp_id: int, emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.name = emp.name
    employee.role = emp.role
    employee.performance_rating = emp.performance_rating
    employee.skill = emp.skill
    employee.training_completed = emp.training_completed

    db.commit()
    db.refresh(employee)
    return employee


# Delete employee
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted"}


# High performers
@app.get("/employees/high-performers", response_model=list[schemas.EmployeeResponse])
def get_high_performers(db: Session = Depends(get_db)):
    return db.query(models.Employee).filter(models.Employee.performance_rating >= 4).all()


# Stats API (🔥 important)
@app.get("/employees/stats")
def get_stats(db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()

    total = len(employees)
    high = len([e for e in employees if e.performance_rating >= 4])
    avg = round(sum([e.performance_rating for e in employees]) / total, 2) if total else 0
    trained = len([e for e in employees if e.training_completed == "Yes"])

    return {
        "total": total,
        "high_performers": high,
        "average_rating": avg,
        "trained": trained
    }