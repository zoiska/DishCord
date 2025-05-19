const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRecipes() {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    // TODO: maybe log error and show a message to the user
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();
  return data;
}
