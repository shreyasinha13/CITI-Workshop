# from fastapi import HTTPException
# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# import models, schemas
# from database import get_db
# from database import Base, engine
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# Base.metadata.create_all(bind=engine)

# # CORS (for frontend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# def home():
#     return {"message": "Backend running"}


# # Create employee
# @app.post("/employees", response_model=schemas.EmployeeResponse)
# def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
#     new_emp = models.Employee(
#         name=emp.name,
#         role=emp.role,
#         performance_rating=emp.performance_rating,
#         skill=emp.skill,
#         training_completed=emp.training_completed
#     )
#     db.add(new_emp)
#     db.commit()
#     db.refresh(new_emp)
#     return new_emp


# # Get employees (filters + pagination + sorting)
# @app.get("/employees", response_model=list[schemas.EmployeeResponse])
# def get_employees(
#     name: str = None,
#     role: str = None,
#     skill: str = None,
#     skip: int = 0,
#     limit: int = 10,
#     sort_by: str = None,
#     order: str = "asc",
#     db: Session = Depends(get_db)
# ):
#     query = db.query(models.Employee)

#     # Filters
#     if name:
#         query = query.filter(models.Employee.name.ilike(f"%{name}%"))

#     if role:
#         query = query.filter(models.Employee.role.ilike(f"%{role}%"))

#     if skill:
#         query = query.filter(models.Employee.skill.ilike(f"%{skill}%"))

#     # Sorting
#     if sort_by:
#         column = getattr(models.Employee, sort_by, None)
#         if column is not None:
#             if order == "desc":
#                 query = query.order_by(column.desc())
#             else:
#                 query = query.order_by(column.asc())

#     # Pagination
#     return query.offset(skip).limit(limit).all()


# # Update employee
# @app.put("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
# def update_employee(emp_id: int, emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
#     employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

#     if not employee:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     employee.name = emp.name
#     employee.role = emp.role
#     employee.performance_rating = emp.performance_rating
#     employee.skill = emp.skill
#     employee.training_completed = emp.training_completed

#     db.commit()
#     db.refresh(employee)
#     return employee


# # Delete employee
# @app.delete("/employees/{emp_id}")
# def delete_employee(emp_id: int, db: Session = Depends(get_db)):
#     employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

#     if not employee:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     db.delete(employee)
#     db.commit()
#     return {"message": "Employee deleted"}


# # High performers
# @app.get("/employees/high-performers", response_model=list[schemas.EmployeeResponse])
# def get_high_performers(db: Session = Depends(get_db)):
#     return db.query(models.Employee).filter(models.Employee.performance_rating >= 4).all()


# # Stats API (🔥 important)
# @app.get("/employees/stats")
# def get_stats(db: Session = Depends(get_db)):
#     employees = db.query(models.Employee).all()

#     total = len(employees)
#     high = len([e for e in employees if e.performance_rating >= 4])
#     avg = round(sum([e.performance_rating for e in employees]) / total, 2) if total else 0
#     trained = len([e for e in employees if e.training_completed == "Yes"])

#     return {
#         "total": total,
#         "high_performers": high,
#         "average_rating": avg,
#         "trained": trained
#     }

# from fastapi import HTTPException
# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# import models, schemas
# from database import get_db
# from database import Base, engine
# from fastapi.middleware.cors import CORSMiddleware



from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_admin
)

app = FastAPI()

Base.metadata.create_all(bind=engine)


# CORS
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


@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(
        models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = models.User(
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": db_user.email,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role
    }


@app.post("/employees", response_model=schemas.EmployeeResponse)
def create_employee(
    emp: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
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


@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(
    name: str = None,
    role: str = None,
    skill: str = None,
    skip: int = 0,
    limit: int = 10,
    sort_by: str = None,
    order: str = "asc",
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    query = db.query(models.Employee)

    if name:
        query = query.filter(models.Employee.name.ilike(f"%{name}%"))

    if role:
        query = query.filter(models.Employee.role.ilike(f"%{role}%"))

    if skill:
        query = query.filter(models.Employee.skill.ilike(f"%{skill}%"))

    if sort_by:
        column = getattr(models.Employee, sort_by, None)
        if column is not None:
            query = query.order_by(
                column.desc() if order == "desc" else column.asc())

    return query.offset(skip).limit(limit).all()


@app.put("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(
    emp_id: int,
    emp: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    employee = db.query(models.Employee).filter(
        models.Employee.id == emp_id).first()

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


@app.delete("/employees/{emp_id}")
def delete_employee(
    emp_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    employee = db.query(models.Employee).filter(
        models.Employee.id == emp_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted"}


@app.get("/employees/high-performers", response_model=list[schemas.EmployeeResponse])
def get_high_performers(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(models.Employee).filter(models.Employee.performance_rating >= 4).all()


@app.get("/employees/stats")
def get_stats(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    employees = db.query(models.Employee).all()

    total = len(employees)
    high = len([e for e in employees if e.performance_rating >= 4])
    avg = round(sum([e.performance_rating for e in employees]
                    ) / total, 2) if total else 0
    trained = len([e for e in employees if e.training_completed == "Yes"])

    return {
        "total": total,
        "high_performers": high,
        "average_rating": avg,
        "trained": trained
    }


@app.post("/reviews", response_model=schemas.ReviewResponse)
def create_review(
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    # Check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.id == review.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_review = models.PerformanceReview(
        employee_id=review.employee_id,
        rating=review.rating,
        feedback=review.feedback,
        review_date=review.review_date
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


@app.get("/reviews/{employee_id}", response_model=list[schemas.ReviewResponse])
def get_reviews_for_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(models.PerformanceReview).filter(
        models.PerformanceReview.employee_id == employee_id
    ).all()


@app.get("/reviews", response_model=list[schemas.ReviewResponse])
def get_all_reviews(
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    return db.query(models.PerformanceReview).all()


@app.delete("/reviews/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    review = db.query(models.PerformanceReview).filter(
        models.PerformanceReview.id == review_id
    ).first()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    db.delete(review)
    db.commit()

    return {"message": "Review deleted"}


@app.post("/development-plans", response_model=schemas.DevelopmentPlanResponse)
def create_plan(plan: schemas.DevelopmentPlanCreate, db: Session = Depends(get_db), user=Depends(require_admin)):
    new_plan = models.DevelopmentPlan(**plan.dict())
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan


@app.get("/development-plans/{employee_id}", response_model=list[schemas.DevelopmentPlanResponse])
def get_plans(employee_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.DevelopmentPlan).filter(models.DevelopmentPlan.employee_id == employee_id).all()


@app.post("/competencies", response_model=schemas.CompetencyResponse)
def create_competency(comp: schemas.CompetencyCreate, db: Session = Depends(get_db), user=Depends(require_admin)):
    new_comp = models.Competency(**comp.dict())
    db.add(new_comp)
    db.commit()
    db.refresh(new_comp)
    return new_comp


@app.get("/competencies/{employee_id}", response_model=list[schemas.CompetencyResponse])
def get_competencies(employee_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.Competency).filter(models.Competency.employee_id == employee_id).all()


@app.post("/trainings", response_model=schemas.TrainingResponse)
def create_training(training: schemas.TrainingCreate, db: Session = Depends(get_db), user=Depends(require_admin)):
    new_training = models.TrainingRecord(**training.dict())
    db.add(new_training)
    db.commit()
    db.refresh(new_training)
    return new_training


@app.get("/trainings/{employee_id}", response_model=list[schemas.TrainingResponse])
def get_trainings(employee_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.TrainingRecord).filter(models.TrainingRecord.employee_id == employee_id).all()