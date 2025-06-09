import React, { useState } from "react";

export interface PetActivity {
  fed: boolean;
  walked: boolean;
}

interface PetActivityFormProps {
  onSave: (activity: PetActivity) => void;
}

const PetActivityForm: React.FC<PetActivityFormProps> = ({ onSave }) => {
  const [fed, setFed] = useState(false);
  const [walked, setWalked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ fed, walked });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Активность с питомцем</h2>
      <label>
        Покормлен:
        <input
          type="checkbox"
          checked={fed}
          onChange={(e) => setFed(e.target.checked)}
        />
      </label>
      <label>
        Выгулян:
        <input
          type="checkbox"
          checked={walked}
          onChange={(e) => setWalked(e.target.checked)}
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default PetActivityForm;
