// src/utils/auth.js
import axios from "axios";

export const login = async ({ email, password }) => {
  const adminEmail = "admin@clinic.com";

  // Keep admin login logic as before
  if (email === adminEmail && password === "admin123") {
    return { role: "admin", email };
  }

  // Normal users: call backend API
  try {
    const res = await axios.post("https://medicare-hospital-management-system-3.onrender.com/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    // Store token for persistent login
    localStorage.setItem("token", token);

    return { role: user.role, email: user.email };
  } catch (err) {
    console.error("Login failed:", err.response?.data?.msg || err.message);
    return null;
  }
};