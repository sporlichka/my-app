from typing import List
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

from .tasks.models import Task

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://user:password@localhost:5432/pets")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

_fake_db: List[Task] = []
_id_counter = 1


def save_task(task_data) -> Task:
    global _id_counter
    task = Task(id=_id_counter, completed=False, **task_data.dict())
    _fake_db.append(task)
    _id_counter += 1
    return task


def get_all_tasks() -> List[Task]:
    return _fake_db
