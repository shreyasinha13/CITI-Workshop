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
