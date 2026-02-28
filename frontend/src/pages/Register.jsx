import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import '../styles/login.css'

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee"
  });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Account Created Successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
      console.log(err)
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select className="selectoption"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Employee">Employee</option>
          <option value="HR">HR</option>
        </select>

        <button onClick={handleRegister} style={{marginBottom:'18px'}}>Register</button>
        <label>Already have an account?</label>
        <p onClick={() => navigate("/")} style={{ cursor: "pointer", marginTop: "10px" ,color:"blue"}}>
           Login
        </p>
        
      </div>
    </div>
  );
};

export default Register;