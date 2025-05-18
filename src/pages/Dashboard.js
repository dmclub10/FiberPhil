import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) navigate("/");
    else setUser(u);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePay = () => {
    const amount = user.plan.split("₱")[1];
    const newPayment = {
      date: new Date().toLocaleDateString(),
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

    setMessage("📨 Payment recorded. Waiting for admin approval.");
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

          <button onClick={handlePay} style={{ marginTop: 20 }}>
            Mark as Paid
          </button>
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
