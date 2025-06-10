const API_URL = import.meta.env.VITE_API_URL;

export async function getUserData(setUserData) {
  const token = localStorage.getItem("t");
  if (token) {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        return data;
      } else {
        const error = await res.json();
        console.error("Error fetching user data:", error);
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  }
}
