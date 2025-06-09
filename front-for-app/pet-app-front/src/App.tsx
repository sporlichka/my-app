import { useState, useEffect } from "react";
import "./App.css";
import PetProfileForm, { type PetProfile } from "./PetProfileForm";
import VaccinationCalendar, { type Vaccination } from "./VaccinationCalendar";
import PetActivityForm, { type PetActivity } from "./PetActivityForm";
import {
  getPets,
  addPet,
  updatePet,
  deletePet,
  addVaccination,
  addActivity,
} from "./api";

// Новый тип питомца
interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  vaccinations: Vaccination[];
  activities: PetActivity[];
}

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка питомцев с сервера
  useEffect(() => {
    setLoading(true);
    getPets()
      .then((data) => setPets(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Добавление нового питомца
  const handleAddPet = async (profile: PetProfile) => {
    setLoading(true);
    setError(null);
    try {
      const newPet = await addPet({ ...profile });
      setPets((prev) => [...prev, newPet]);
      setShowForm(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Редактирование питомца
  const handleEditPet = async (profile: PetProfile) => {
    if (!editingPet) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updatePet(editingPet.id, {
        ...editingPet,
        ...profile,
      });
      setPets((prev) =>
        prev.map((p) => (p.id === editingPet.id ? updated : p))
      );
      setEditingPet(null);
      setShowForm(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Удаление питомца
  const handleDeletePet = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
      if (selectedPetId === id) setSelectedPetId(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Добавление прививки
  const handleAddVaccination = async (v: Vaccination) => {
    if (!selectedPetId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await addVaccination(selectedPetId, v);
      setPets((prev) =>
        prev.map((p) => (p.id === selectedPetId ? updated : p))
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Добавление активности
  const handleAddActivity = async (a: PetActivity) => {
    if (!selectedPetId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await addActivity(selectedPetId, a);
      setPets((prev) =>
        prev.map((p) => (p.id === selectedPetId ? updated : p))
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedPet = pets.find((p) => p.id === selectedPetId) || null;

  return (
    <div>
      <h1>Питомцы</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => {
          setShowForm(true);
          setEditingPet(null);
        }}
        disabled={loading}
      >
        Добавить питомца
      </button>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <span
              style={{
                cursor: "pointer",
                fontWeight: pet.id === selectedPetId ? "bold" : undefined,
              }}
              onClick={() => setSelectedPetId(pet.id)}
            >
              {pet.name} ({pet.breed}, {pet.age} лет)
            </span>
            <button
              onClick={() => {
                setEditingPet(pet);
                setShowForm(true);
              }}
              disabled={loading}
            >
              Редактировать
            </button>
            <button onClick={() => handleDeletePet(pet.id)} disabled={loading}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      {showForm && (
        <PetProfileForm
          onSave={editingPet ? handleEditPet : handleAddPet}
          initialData={editingPet || undefined}
        />
      )}
      {selectedPet && !showForm && (
        <>
          <h3>
            Питомец: {selectedPet.name}, {selectedPet.breed}, {selectedPet.age}{" "}
            лет
          </h3>
          <VaccinationCalendar onAdd={handleAddVaccination} />
          <ul>
            {selectedPet.vaccinations.map((v, i) => (
              <li key={i}>
                {v.date}: {v.vaccine}
              </li>
            ))}
          </ul>
          <PetActivityForm onSave={handleAddActivity} />
          {selectedPet.activities.length > 0 && (
            <div>
              <h4>Последняя активность:</h4>
              <p>
                Покормлен:{" "}
                {selectedPet.activities[selectedPet.activities.length - 1].fed
                  ? "Да"
                  : "Нет"}
              </p>
              <p>
                Выгулян:{" "}
                {selectedPet.activities[selectedPet.activities.length - 1]
                  .walked
                  ? "Да"
                  : "Нет"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
