import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(" ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    axios
      .post(
        "http://localhost:5000/login",
        {
          email: email,
          pass: pass,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.category === "admin") navigate("/admin");
        else navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <h3 className="error">{message}</h3>
          <h2>LOGIN</h2>
          <br />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="loginInput"
          autoComplete="off"
          required
        />
        <br />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="password"
          className="loginInput"
          autoComplete="off"
          required
        />
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
