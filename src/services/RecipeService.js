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

export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to fetch recipe");
  }
  const data = await response.json();
  return data;
}

export async function createRecipe(recipe) {
  const formData = new FormData();

  formData.append("name", recipe.name);
  formData.append("preparation", recipe.preparation);
  formData.append("author", recipe.author);
  formData.append("ingredients", JSON.stringify(recipe.ingredients));

  recipe.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: { AccessControlAllowOrigin: "*" },
    body: formData,
  });
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to create recipe");
  }

  const data = await response.json();
  return data;
}

export async function updateRecipe(id, recipe) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to update recipe");
  }
  const data = await response.json();
  return data;
}

export async function deleteRecipe(id) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
  const data = await response.json();
  return data;
}

export async function searchRecipes(query) {
  const response = await fetch(`${API_URL}/recipes/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to search recipes");
  }
  const data = await response.json();
  return data;
}

export async function filterRecipesByAuthor(author) {
  const response = await fetch(
    `${API_URL}/recipes/filter/author?query=${encodeURIComponent(author)}`
  );
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to search recipes");
  }
  const data = await response.json();
  return data;
}

export async function getRandomRecipe() {
  const response = await fetch(`${API_URL}/recipes/random`);
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to fetch random recipe");
  }
  const data = await response.json();
  return data;
}
