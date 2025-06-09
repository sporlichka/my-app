from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    deadline: Optional[datetime] = None
    description: str


class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool


class Vaccination(BaseModel):
    date: str
    vaccine: str


class PetActivity(BaseModel):
    fed: bool
    walked: bool


class PetBase(BaseModel):
    name: str
    breed: str
    age: int


class PetCreate(PetBase):
    vaccinations: Optional[List[Vaccination]] = []
    activities: Optional[List[PetActivity]] = []


class Pet(PetBase):
    id: str
    vaccinations: List[Vaccination] = []
    activities: List[PetActivity] = []
