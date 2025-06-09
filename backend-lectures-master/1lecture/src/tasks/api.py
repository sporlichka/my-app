from typing import List
from fastapi import APIRouter, HTTPException
from .crud import PetCRUD
from .models import Pet, PetCreate, Vaccination, PetActivity

router = APIRouter()

@router.get("/pets", response_model=List[Pet])
def get_pets():
    return PetCRUD.get_all_pets()

@router.post("/pets", response_model=Pet)
def add_pet(pet: PetCreate):
    return PetCRUD.create_pet(pet)

@router.put("/pets/{id}", response_model=Pet)
def update_pet(id: str, pet: PetCreate):
    updated = PetCRUD.update_pet(id, pet)
    if not updated:
        raise HTTPException(status_code=404, detail="Pet not found")
    return updated

@router.delete("/pets/{id}")
def delete_pet(id: str):
    deleted = PetCRUD.delete_pet(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Pet not found")
    return {"ok": True}

@router.post("/pets/{id}/vaccinations", response_model=Pet)
def add_vaccination(id: str, vaccination: Vaccination):
    pet = PetCRUD.add_vaccination(id, vaccination)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

@router.post("/pets/{id}/activities", response_model=Pet)
def add_activity(id: str, activity: PetActivity):
    pet = PetCRUD.add_activity(id, activity)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet
