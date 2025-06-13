const API_URL = import.meta.env.VITE_API_URL;

export async function getUserData(setUserData) {
  const token = localStorage.getItem("t");
  if (!token) {
    console.error("No token found in local storage.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/user-context`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log("User data fetched successfully:", data);
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
