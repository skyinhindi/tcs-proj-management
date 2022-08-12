import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
//import "./NewProject.css";

const NewProject = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const sow = document.getElementById("sow").value;
    const endDate = document.getElementById("endDate").value;
    const budget = document.getElementById("budget").value;
    const pmos = document.getElementById("pmos").value.split(",");

    axios
      .post(
        "http://localhost:5000/new-project",
        {
          id: id,
          title: title,
          description: description,
          sow: sow,
          endDate: endDate,
          budget: budget,
          pmos: pmos,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((res) => navigate("/admin"))
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div>
        <h3>Create New Project</h3>
        <br />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          id="id"
          placeholder="Project ID"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Project Title"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Project Description"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="sow"
          id="sow"
          placeholder="Statement of Work"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="endDate"
          id="endDate"
          placeholder="Expected Date of Completion"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="budget"
          id="budget"
          placeholder="Budget"
          className="NewProjectInput"
        />
        <br />
        <input
          type="text"
          name="pmos"
          id="pmos"
          placeholder="Assign Pmos(comma separated)"
          className="NewProjectInput"
        />
        <br />
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProject;
