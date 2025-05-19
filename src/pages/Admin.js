import React, { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers);
  }, []);


  const markAsPaid = (name) => {
    const updatedUsers = users.map((user) =>
      user.name === name
        ? {
            ...user,
            status: "Paid",
            payments: [
              ...(user.payments || []),
              {
                date: new Date().toLocaleDateString(),
                amount: user.plan.split("₱")[1],
              },
            ],
          }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    window.location.href = "/";
  };

  const toggleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const deleteSelected = () => {
    const remainingUsers = users.filter((user) => !selected.includes(user.name));
    setUsers(remainingUsers);
    localStorage.setItem("users", JSON.stringify(remainingUsers));
    setSelected([]);
  };

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ color: "#f57c00" }}>📊 Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {selected.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <button onClick={deleteSelected} style={{ backgroundColor: "red", color: "white" }}>
            Delete Selected ({selected.length})
          </button>
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f57c00", color: "#fff" }}>
            <th style={th}></th>
            <th style={th}>Name</th>
            <th style={th}>Phone</th>
            <th style={th}>Plan</th>
            <th style={th}>Joined</th>
            <th style={th}>Status</th>
            <th style={th}>Payments</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user, i) => (
              <tr key={i}>
                <td style={td}>
                  <input
                    type="checkbox"
                    checked={selected.includes(user.name)}
                    onChange={() => toggleSelect(user.name)}
                  />
                </td>
                <td style={td}>{user.name}</td>
                <td style={td}>{user.phone || "—"}</td>
                <td style={td}>{user.plan}</td>
                <td style={td}>{user.joined}</td>
                <td style={td}>{user.status}</td>            
                <td style={td}>
                  {user.payments?.length > 0 ? (
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {user.payments.map((p, i) => (
                        <li key={i}>
                          {p.date} - ₱{p.amount}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
                <td style={td}>
                  {user.status === "Pending" ? (
                    <button onClick={() => markAsPaid(user.name)}>Mark as Paid</button>
                  ) : (
                    "✔"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Table styling
const th = {
  padding: "12px",
  border: "1px solid #ddd",
  fontWeight: "bold",
};

const td = {
  padding: "12px",
  border: "1px solid #ddd",
};
