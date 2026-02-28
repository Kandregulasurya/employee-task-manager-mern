import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import './navbar.css'

const Navbar = ({ title }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar">
    <div className="navbar-title">{title}</div>

    <button className="logout-btn" onClick={logout}>
      <MdLogout/>
    </button>
  </div>
  );
};

export default Navbar;