import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./Dashboard.css";

const Dashboard = () => {
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
    <div className="dashboard">
      <Navbar admin={false} />
      <div className="projectList">
        <h4>Your Projects:</h4>
        {list.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
