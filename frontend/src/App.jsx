import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Register from "./pages/Register";
import "./app.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/hr"
            element={
              <PrivateRoute role="HR">
                <HRDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <PrivateRoute role="Employee">
                <EmployeeDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;