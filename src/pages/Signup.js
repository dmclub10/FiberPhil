import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Basic");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      phone,
      dueDate,
      password,
      plan,
      joined: new Date().toLocaleDateString(),
      status: "Pending",
      payments: [],
    };
<select value={plan} onChange={(e) => setPlan(e.target.value)}>
  <option value="Basic - ₱499">Basic - ₱499</option>
  <option value="Standard - ₱999">Standard - ₱999</option>
  <option value="Premium - ₱1499">Premium - ₱1499</option>
</select>


    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    navigate("/dashboard");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Create an Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
  type="date"
  value={birthday}
  onChange={(e) => setBirthday(e.target.value)}
  required
/>


        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select value={dueDate} onChange={(e) => setDueDate(e.target.value)} required>
  <option value="" disabled>Select Due Date</option>
  <option value="15">Every 15th</option>
  <option value="30">Every 30th</option>
</select>


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="Basic ₱499">Basic ₱499</option>
        <option value="Surf Saver ₱699">Surf Saver ₱699</option>
        <option value="Night Owl ₱799">Night Owl ₱799</option>
        <option value="Weekender ₱850">Weekender ₱850</option>
        <option value="Stream Lite ₱999">Stream Lite ₱999</option>
        <option value="Unlimited Basic ₱1199">Unlimited Basic ₱1199</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
