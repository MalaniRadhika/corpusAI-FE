import "./Register.css";
import { useState } from "react";
import API from "../services/api";

function Register({ setScreen }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const register = async () => {
    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Account created successfully");
      setScreen("login");

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Create Account</h1>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="primary-btn" onClick={register}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p
          className="secondary-link"
          onClick={() => setScreen("login")}
        >
          Back To Login
        </p>

      </div>
    </div>
  );
}

export default Register;