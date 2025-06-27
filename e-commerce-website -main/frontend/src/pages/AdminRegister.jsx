import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-register": "true", // ✅ Important for backend check
        },
        body: JSON.stringify({ ...formData, role: "admin" }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "admin");
        toast.success("Admin registered successfully!");
        window.location.href = "http://localhost:3001/";  // redirect to your admin dashboard
      } else {
        toast.error(data.message || "Admin registration failed.");
      }
    } catch (err) {
      toast.error("Server error.");
      console.error("Admin registration error:", err);
    }
  };

  return (
    <div className="loginsignup-container">
  <h1>Register as Admin</h1>

  <form onSubmit={handleRegister} className="loginsignup-fields">
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
    />
    <button type="submit">Register as Admin</button>
  </form>

  <p className="loginsignup-login">
    Already registered?{" "}
    <span onClick={() => window.location.href = "/login"}>Login</span>
  </p>
</div>

  );
};

export default AdminRegister;
