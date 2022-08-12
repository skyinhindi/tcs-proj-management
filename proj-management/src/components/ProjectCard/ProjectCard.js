import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ item, admin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (admin) navigate("/admin/project" + item.id);
    else navigate("/project" + item.id);
  };

  return (
    <div className="card">
      <a onClick={handleClick}>
        <p>
          <span>ID:</span> {item.id}
          <span> | Status:</span> {item.status}
          <br />
        </p>
        <h4>{item.title}</h4>
      </a>
    </div>
  );
};

export default ProjectCard;
