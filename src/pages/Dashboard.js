// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = { ...user, proof: reader.result };
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // other functions like handlePay, handleLogout, etc.
const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/");
};
const handlePay = () => {
  const today = new Date();
  const thisMonth = today.getMonth(); // 0 to 11
  const thisYear = today.getFullYear();

  // Check if payment already exists for this month
  const hasPaidThisMonth = (user.payments || []).some((payment) => {
    const [month, day, year] = payment.date.split("/").map(Number);
    return month - 1 === thisMonth && year === thisYear;
  });

  if (hasPaidThisMonth) {
    setMessage("⚠️ You’ve already paid this month.");
    return;
  }

  const amount = user.plan?.split("₱")[1] || "0";

  const newPayment = {
    date: today.toLocaleDateString(),
    amount,
  };

  const updatedUser = {
    ...user,
    status: "Pending",
    payments: [...(user.payments || []), newPayment],
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);
  setMessage("📨 Payment for this month submitted. Waiting for admin approval.");
};


  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#f57c00" }}>FiberPhil Account</h1>
        <div>
          <span style={{ marginRight: 20 }}>👤 {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#333" }} />

      {/* MAIN CONTENT */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        {/* LEFT: Payment Info */}
        <div style={{ background: "#1e1e1e", padding: 20, borderRadius: 10 }}>
          <h2>📄 Your Plan</h2>
          <p><b>WiFi Plan:</b> {user.plan}</p>
          <p><b>Subscribed On:</b> {user.joined}</p>
          <p><b>Status:</b> {user.status || "Unpaid"}</p>

          <h3 style={{ marginTop: 20 }}>💳 Payment History</h3>
          <ul>
            {user.payments?.length > 0 ? (
              user.payments.map((p, i) => (
                <li key={i}>
                  {p.date} - ₱{p.amount}
                </li>
              ))
            ) : (
              <li>No payments yet.</li>
            )}
          </ul>

          <button
  onClick={handlePay}
  disabled={!user.plan || user.status === "Pending" || user.status === "Paid"}
>
  {user.status === "Pending"
    ? "Waiting for Approval"
    : user.status === "Paid"
    ? "Already Paid"
    : "Mark as Paid"}
</button>
{message && (
  <p style={{ marginTop: "10px", color: "#00e676", fontWeight: "bold" }}>
    {message}
  </p>
)}


<input
  type="file"
  accept="image/*"
  onChange={(e) => handleProofUpload(e)}
  style={{ marginTop: "10px" }}
/>

          {message && <p style={{ marginTop: 10, color: "#00e676" }}>{message}</p>}
        </div>

        {/* RIGHT: GCash QR */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
  <h3>Pay via GCash</h3>
  <img
    src="/gcash-qr.jpg"
    alt="GCash QR Code"
    style={{ width: "200px", borderRadius: "8px", boxShadow: "0 0 10px #f57c00" }}
  />
  <p>Scan this using your GCash app to pay</p>
</div>

      </div>
    </div>
  );
}
