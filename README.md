# Employee Management System

## Features

* Create, Read, Update, Delete Employees
* Search & Filter employees
* PostgreSQL database integration
* FastAPI backend

## Tech Stack

* Backend: FastAPI (Python)
* Database: PostgreSQL
* ORM: SQLAlchemy

## How to Run

1. Install dependencies
   pip install fastapi uvicorn sqlalchemy psycopg2-binary

2. Start server
   uvicorn main:app --reload

3. Open in browser
   http://127.0.0.1:8000/docs

## APIs

* POST /employees
* GET /employees
* PUT /employees/{id}
* DELETE /employees/{id}

