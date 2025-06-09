from typing import List, Optional
from .models import Pet, PetCreate, Vaccination, PetActivity
import uuid

class PetCRUD:
    pets: List[Pet] = []

    @classmethod
    def get_all_pets(cls) -> List[Pet]:
        return cls.pets

    @classmethod
    def create_pet(cls, pet_data: PetCreate) -> Pet:
        pet = Pet(id=str(uuid.uuid4()), **pet_data.dict())
        cls.pets.append(pet)
        return pet

    @classmethod
    def update_pet(cls, id: str, pet_data: PetCreate) -> Optional[Pet]:
        for i, pet in enumerate(cls.pets):
            if pet.id == id:
                updated_pet = Pet(id=id, **pet_data.dict())
                cls.pets[i] = updated_pet
                return updated_pet
        return None

    @classmethod
    def delete_pet(cls, id: str) -> bool:
        for i, pet in enumerate(cls.pets):
            if pet.id == id:
                del cls.pets[i]
                return True
        return False

    @classmethod
    def add_vaccination(cls, id: str, vaccination: Vaccination) -> Optional[Pet]:
        for pet in cls.pets:
            if pet.id == id:
                pet.vaccinations.append(vaccination)
                return pet
        return None

    @classmethod
    def add_activity(cls, id: str, activity: PetActivity) -> Optional[Pet]:
        for pet in cls.pets:
            if pet.id == id:
                pet.activities.append(activity)
                return pet
        return None
