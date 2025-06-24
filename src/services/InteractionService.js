const API_URL = import.meta.env.VITE_API_URL;

export async function bookmarkRecipe(recipeId) {
  console.log(recipeId);
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

export async function getAllComments(recipeId) {
  try {
    const res = await fetch(`${API_URL}/recipes/comments?query=${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      const error = await res.json();
      console.error("Error fetching comments", error);
    }
  } catch (error) {
    console.error("Error fetching comments", error);
  }
}

export async function createComment(recipeId, commentText) {
  const token = localStorage.getItem("t");
  if (!token) {
    throw new Error("No token found in local storage.");
  }
  try {
    const res = await fetch(`${API_URL}/recipes/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ recipeId, commentText, timestamp: new Date().toISOString() }),
    });
    if (res.ok) {
      return console.log("Successfully added comment to", recipeId);
    } else {
      const error = await res.json();
      console.error("Error adding comment", error);
    }
  } catch (error) {
    console.error("Error adding comment", error);
  }
}

export async function deleteComment(recipeId, commentId) {
  const token = localStorage.getItem("t");
  if (!token) {
    throw new Error("No token found in local storage.");
  }
  try {
    const res = await fetch(`${API_URL}/recipes/${recipeId}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.ok) {
      return true;
    } else {
      const error = await res.json();
      console.error("Error deleting comment", error);
      return false;
    }
  } catch (error) {
    console.error("Error deleting comment", error);
    return false;
  }
}
