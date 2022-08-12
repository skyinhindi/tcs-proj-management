import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("null");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const name = document.getElementById("name").value;
    const empNo = document.getElementById("empno").value;

    axios
      .post(
        "http://localhost:5000/register",
        {
          email: email,
          pass: pass,
          name: name,
          empNo: empNo,
          category: category,
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
      <div>
        <h3>Register</h3>
        <br />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="number"
          name="empno"
          id="empno"
          placeholder="employee number"
          className="RegisterInput"
        />
        <br />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="RegisterInput"
        />
        <br />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="RegisterInput"
        />
        <br />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="password"
          className="RegisterInput"
        />
        <br />
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="null">Select Category</option>
          <option value="admin">Admin</option>
          <option value="pmo">PMO</option>
        </select>
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
