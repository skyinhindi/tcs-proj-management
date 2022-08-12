import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ admin }) => {
  const navigate = useNavigate();
  const resetPass = () => navigate("/reset-password");
  const logout = () => navigate("/");
  const dash = () =>
    admin == true ? navigate("/admin") : navigate("/dashboard");

  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="navbar">
      <p>Project Management Software</p>
      <div className="dropdown">
        <a className="dropbtn" onClick={() => setDropdown(!dropdown)}>
          &#9776;
        </a>
        {dropdown && (
          <div className="dropdown-links">
            <a onClick={dash}>Dashboard</a>
            {admin && <a onClick={() => navigate("/register")}>New PMO</a>}
            {admin && (
              <a onClick={() => navigate("/new-project")}>New Project</a>
            )}
            <a onClick={resetPass}>Reset Password</a>
            <a onClick={logout}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
