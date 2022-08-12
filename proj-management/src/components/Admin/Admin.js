import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await (
      await axios.get("http://localhost:5000/get-projects")
    ).data.data;
    setList(res);
    localStorage.setItem("projects", JSON.stringify(res));
  };

  useEffect(() => fetchData, []);
  return (
    <div className="admin">
      <Navbar admin={true} />
      <div className="projectList">
        <h4>All Projects:</h4>
        {list.map((item) => (
          <ProjectCard key={item.id} item={item} admin={true} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
