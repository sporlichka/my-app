import React, { useState } from "react";

export interface Vaccination {
  date: string;
  vaccine: string;
}

interface VaccinationCalendarProps {
  onAdd: (vaccination: Vaccination) => void;
}

const VaccinationCalendar: React.FC<VaccinationCalendarProps> = ({ onAdd }) => {
  const [date, setDate] = useState("");
  const [vaccine, setVaccine] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ date, vaccine });
    setDate("");
    setVaccine("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Календарь прививок</h2>
      <label>
        Дата прививки:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Название прививки:
        <input
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
          required
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default VaccinationCalendar;
