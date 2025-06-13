const API_URL = import.meta.env.VITE_API_URL;

export async function login(user, setIsAuthenticated) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      // TODO: maybe log error and show a message to the user
      const error = await response.json();
      console.error(error);
      throw new Error("Failed to login");
    }
    const data = await response.json();
    localStorage.setItem("t", data.token);
    setIsAuthenticated(true);
    return data;
  } catch (error) {
    // TODO: Handle error (show UI message)
    console.error("Login error:", error);
  }
}

export async function register(user, navigate) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, password: user.password }),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      const error = await res.json();
      console.error(error);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
}

export async function checkStatus(setIsAuthenticated) {
  const token = localStorage.getItem("t");
  if (token) {
    try {
      const res = await fetch(`${API_URL}/auth/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setIsAuthenticated(false);
    }
  }
}
