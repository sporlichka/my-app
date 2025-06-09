import React, { useState, useEffect } from "react";

export interface PetProfile {
  name: string;
  breed: string;
  age: number;
}

interface PetProfileFormProps {
  onSave: (pet: PetProfile) => void;
  initialData?: PetProfile;
}

const PetProfileForm: React.FC<PetProfileFormProps> = ({
  onSave,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState<number | "">("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBreed(initialData.breed);
      setAge(initialData.age);
    } else {
      setName("");
      setBreed("");
      setAge("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age === "") return;
    onSave({ name, breed, age: Number(age) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Профиль питомца</h2>
      <label>
        Кличка:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Порода:
        <input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </label>
      <label>
        Возраст:
        <input
          type="number"
          value={age}
          onChange={(e) =>
            setAge(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
          min="0"
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default PetProfileForm;
