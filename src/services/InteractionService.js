const API_URL = import.meta.env.VITE_API_URL;

export async function bookmarkRecipe(recipeId) {
  const token = localStorage.getItem("t");
  if (!token) {
    throw new Error("No token found in local storage.");
  }
  try {
    const res = await fetch(`${API_URL}/recipes/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ recipeId }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Recipe bookmarked successfully:", data);
      return data;
    } else {
      const error = await res.json();
      console.error("Error bookmarking recipe:", error);
    }
  } catch (error) {
    console.error("Error bookmarking recipe: ", error);
  }
}

export async function sentimentRecipe(recipeId, sentiment) {
  const token = localStorage.getItem("t");
  if (!token) {
    throw new Error("No token found in local storage.");
  }
  try {
    const res = await fetch(`${API_URL}/recipes/sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ recipeId, sentiment }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Recipe sentiment updated successfully:", data);
      return data;
    } else {
      const error = await res.json();
      console.error("Error updating recipe sentiment:", error);
    }
  } catch (error) {
    console.error("Error updating recipe sentiment: ", error);
  }
}
