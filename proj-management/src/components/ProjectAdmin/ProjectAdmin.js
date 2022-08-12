import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import GanttChart from "../GanttChart/GanttChart";

import "./ProjectAdmin.css";

const ProjectAdmin = () => {
  const [editVisibile, setEditVisible] = useState(false);
  const { id } = useParams();
  const projects = JSON.parse(localStorage.getItem("projects"));
  let project = projects.filter((el) => {
    return el.id === id;
  });
  project = project[0];
  const [pmo, setPMO] = useState(project.pmo);
  const projectClass =
    "projectAdmin-details-container " + project.status + "-project";

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditVisible(false);
    const description = document.getElementById("description").value;
    if (description !== "") project.description = description;
    const sow = document.getElementById("sow").value;
    if (sow !== "") project.sow = sow;
    const endDate = document.getElementById("endDate").value;
    if (endDate !== "") project.endDate = endDate;
    const budget = document.getElementById("budget").value;
    if (budget !== "") project.budget = budget;
    const newpmo = document.getElementById("add-pmo").value;
    if (newpmo !== "") {
      const arr = pmo;
      arr.push(newpmo);
      setPMO([...arr]);
      project.pmo = pmo;
    }
    axios
      .post(
        "http://localhost:5000/update-project",
        {
          id: project.id,
          description: project.description,
          sow: project.sow,
          endDate: project.endDate,
          budget: project.budget,
          pmo: project.pmo,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const removePmo = (el) => {
    const index = pmo.indexOf(el);
    let arr = pmo;
    arr.splice(index, 1);
    setPMO([...arr]);
  };

  const PMO = ({ project }) => {
    return (
      <div className="PMO-container">
        {pmo.map((el) => (
          <section className="PMO">
            {el}
            <a onClick={() => removePmo(el)}> &#10005;</a>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className="projectAdmin">
      <Navbar admin={true} />
      {editVisibile === true ? (
        <div className="editForm">
          <form method="POST" onSubmit={handleSubmit}>
            <h4>Edit Project Details</h4>
            <select name="status" id="status">
              <option value="active">active</option>
              <option value="suspended">suspended</option>
              <option value="closed">closed</option>
            </select>
            <br />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Project Description"
              className="NewProjectInput"
              autoComplete="off"
            />
            <br />
            <input
              type="text"
              name="sow"
              id="sow"
              placeholder="Statement of Work"
              className="NewProjectInput"
              autoComplete="off"
            />
            <br />
            <input
              type="text"
              name="endDate"
              id="endDate"
              placeholder="Expected Date of Completion"
              className="NewProjectInput"
              autoComplete="off"
            />
            <br />
            <input
              type="text"
              name="budget"
              id="budget"
              placeholder="Budget"
              className="NewProjectInput"
              autoComplete="off"
            />
            <br />
            <input
              type="text"
              name="add-pmo"
              id="add-pmo"
              placeholder="Add PMO"
              className="NewProjectInput"
              autoComplete="off"
            />
            <br />
            <br />
            Assigned PMOs:
            <PMO project={project} />
            <br />
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className={projectClass}>
          <button className="editButton" onClick={() => setEditVisible(true)}>
            Edit
          </button>
          <p>
            <span className="heading">ID:</span> {project.id}
            <br />
            <h4>{project.title}</h4>
            <br />
            {project.description}
            <br />
            <span className="heading">SOW:</span> {project.sow}
            <br />
            <span className="heading">Start Date:</span> {project.startDate}
            <br />
            <span className="heading">Expected End Date:</span>{" "}
            {project.endDate}
            <br />
            <span className="heading">Budget:</span> {project.budget}
            <br />
            <span className="heading">PMOs Assigned:</span>
            {pmo.map((el) => ` ${el}, `)}
          </p>
          <GanttChart data={project.subTasks} />}
        </div>
      )}
    </div>
  );
};

export default ProjectAdmin;
