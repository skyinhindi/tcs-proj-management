import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const oldpass = document.getElementById("oldpass").value;
    const newpass = document.getElementById("newpass").value;

    axios
      .post(
        "http://localhost:5000/reset-password",
        {
          email: email,
          oldpass: oldpass,
          newpass: newpass,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((res) => navigate("/dashboard"))
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div>
        <h3>ResetPassword</h3>
        <br />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="ResetPasswordInput"
        />
        <br />
        <input
          type="password"
          name="oldpass"
          id="oldpass"
          placeholder="old password"
          className="ResetPasswordInput"
        />
        <br />
        <input
          type="password"
          name="newpass"
          id="newpass"
          placeholder="new password"
          className="ResetPasswordInput"
        />
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
