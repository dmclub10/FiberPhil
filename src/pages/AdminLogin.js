import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin") {
      localStorage.setItem("admin_logged_in", "true");
      navigate("/admin");
    } else {
      setError("❌ Incorrect admin password.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

