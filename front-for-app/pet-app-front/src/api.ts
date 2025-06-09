const API_URL = "http://localhost:8000";

export async function getPets() {
  const res = await fetch(`${API_URL}/pets`);
  if (!res.ok) throw new Error("Ошибка загрузки питомцев");
  return res.json();
}

export async function addPet(pet: any) {
  const res = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error("Ошибка добавления питомца");
  return res.json();
}

export async function updatePet(id: string, pet: any) {
  const res = await fetch(`${API_URL}/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  if (!res.ok) throw new Error("Ошибка обновления питомца");
  return res.json();
}

export async function deletePet(id: string) {
  const res = await fetch(`${API_URL}/pets/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Ошибка удаления питомца");
}

export async function addVaccination(id: string, vaccination: any) {
  const res = await fetch(`${API_URL}/pets/${id}/vaccinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vaccination),
  });
  if (!res.ok) throw new Error("Ошибка добавления прививки");
  return res.json();
}

export async function addActivity(id: string, activity: any) {
  const res = await fetch(`${API_URL}/pets/${id}/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity),
  });
  if (!res.ok) throw new Error("Ошибка добавления активности");
  return res.json();
}
