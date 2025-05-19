import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0c0c",
      color: "#fff",
      fontFamily: "'Segoe UI', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        background: "#1a1a1a",
        borderRadius: "20px",
        boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)",
        padding: "40px",
        border: "1px solid #333"
      }}>
        <h1 style={{
          color: "gold",
          fontSize: "32px",
          borderBottom: "2px solid gold",
          paddingBottom: "10px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          📞 Contact Us
        </h1>

        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          Thank you for trusting <strong>FiberPhil</strong>. For support, payments, or other concerns, reach out through the channels below:
        </p>

        <ul style={{ marginTop: "30px", paddingLeft: "20px", fontSize: "18px" }}>
          <li style={{ marginBottom: "15px" }}>
            📱 <strong>Phone:</strong> <a href="tel:09171234567" style={linkStyle}>0917-123-4567</a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            📧 <strong>Email:</strong> <a href="mailto:fiberphil@example.com" style={linkStyle}>fiberphil@example.com</a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            💬 <strong>Facebook:</strong> <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" style={linkStyle}>@fiberphil</a>
          </li>
        </ul>

        <p style={{ marginTop: "30px", fontStyle: "italic", fontSize: "16px", textAlign: "center" }}>
          We respond quickly — usually within 1 hour during business hours.
        </p>

        {/* 🔙 Back to Dashboard Button */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "gold",
              color: "#000",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "gold",
  textDecoration: "none",
  fontWeight: "bold"
};
