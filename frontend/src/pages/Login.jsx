import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);

      if (res.data.role === "HR") navigate("/hr");
      else navigate("/employee");
    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Employee Task Management</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} style={{marginBottom:"18px"}}>Login</button>
        <label>Don't have an account? </label>
        <p onClick={() => navigate("/register")} style={{ cursor: "pointer", marginTop: "10px",color:"blue" }}>
        Register
        </p>
      </div>
    </div>
  );
};

export default Login;