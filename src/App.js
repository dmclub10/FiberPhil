import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';import AdminLogin from "./pages/AdminLogin";
import { Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import './App.css';
import Contact from "./pages/Contact";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route
  path="/signup"
  element={
    <Signup onSignup={(user) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard"; // redirect after signup
    }} />
  }
/>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-login" element={<AdminLogin />} />

<Route
  path="/admin"
  element={
    localStorage.getItem("admin_logged_in") === "true" ? (
      <Admin />
    ) : (
      <Navigate to="/admin-login" />
    )
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

