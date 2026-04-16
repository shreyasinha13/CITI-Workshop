# from pydantic import BaseModel

# class EmployeeCreate(BaseModel):
#     name: str
#     role: str

# class EmployeeResponse(BaseModel):
#     id: int
#     name: str
#     role: str

#     class Config:
#         from_attributes = True

from pydantic import BaseModel


# class EmployeeCreate(BaseModel):
#     name: str
#     role: str
#     performance_rating: int
#     skill: str
#     training_completed: str


# class EmployeeResponse(BaseModel):
#     id: int
#     name: str
#     role: str
#     performance_rating: int
#     skill: str
#     training_completed: str

#     class Config:
#         from_attributes = True


from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    name: str
    role: str
    performance_rating: int
    skill: str
    training_completed: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    role: str
    performance_rating: int
    skill: str
    training_completed: str

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "employee"


class UserLogin(BaseModel):
    email: str
    password: str


class ReviewCreate(BaseModel):
    employee_id: int
    rating: int
    feedback: str
    review_date: str


class ReviewResponse(BaseModel):
    id: int
    employee_id: int
    rating: int
    feedback: str
    review_date: str

    class Config:
        from_attributes = True


class DevelopmentPlanCreate(BaseModel):
    employee_id: int
    goal: str
    progress: str
    deadline: str


class DevelopmentPlanResponse(DevelopmentPlanCreate):
    id: int

    class Config:
        from_attributes = True


class CompetencyCreate(BaseModel):
    employee_id: int
    skill: str
    level: str


class CompetencyResponse(CompetencyCreate):
    id: int

    class Config:
        from_attributes = True


class TrainingCreate(BaseModel):
    employee_id: int
    training_name: str
    status: str
    date: str


class TrainingResponse(TrainingCreate):
    id: int

    class Config:
        from_attributes = True