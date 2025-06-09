from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from ..database import Base

class PetDB(Base):
    __tablename__ = "pets"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    breed = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    vaccinations = relationship("VaccinationDB", back_populates="pet", cascade="all, delete-orphan")
    activities = relationship("PetActivityDB", back_populates="pet", cascade="all, delete-orphan")

class VaccinationDB(Base):
    __tablename__ = "vaccinations"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    vaccine = Column(String, nullable=False)
    pet_id = Column(String, ForeignKey("pets.id"))
    pet = relationship("PetDB", back_populates="vaccinations")

class PetActivityDB(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    fed = Column(Boolean, nullable=False)
    walked = Column(Boolean, nullable=False)
    pet_id = Column(String, ForeignKey("pets.id"))
    pet = relationship("PetDB", back_populates="activities") 