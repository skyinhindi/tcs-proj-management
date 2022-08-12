import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import GanttChart from "../GanttChart/GanttChart";
import Navbar from "../Navbar/Navbar";
import "./Project.css";

const Project = () => {
  const { id } = useParams();

  const [visible, setVisible] = useState(false);
  const [sub, setSub] = useState([]);
  let projects = [];
  const [project, setProject] = useState({});
  const [projectClass, setProjectClass] = useState("");
  const [subLoaded, setSubLoaded] = useState(false);

  const setData = () => {
    setSubLoaded(false);
    projects = JSON.parse(localStorage.getItem("projects"));
    let pro = projects.filter((el) => {
      return el.id === id;
    });
    pro = pro[0];
    setProject(pro);
    setSub([...pro.subTasks]);
    setSubLoaded(true);
    let proClass = "project-details-container " + pro.status + "-project";
    setProjectClass(proClass);
  };

  const fetchData = async () => {
    const res = await (
      await axios.get("http://localhost:5000/get-projects")
    ).data.data;
    localStorage.setItem("projects", JSON.stringify(res));
    setData();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const newTask = {
      taskName: taskName,
      timeline: [startDate, endDate],
    };
    let arr = [...sub];
    arr = [...arr, newTask];
    axios
      .post(
        "http://localhost:5000/add-subtask",
        {
          id: project.id,
          subtasks: arr,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        fetchData();
        setVisible(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  }, []);

  return (
    <div className="project">
      <Navbar />
      {visible && (
        <div className="add-subtask">
          <form>
            <input
              type="text"
              id="task-name"
              name="task-name"
              placeholder="subtask name"
              required
            />
            <br />
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" required />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" required />
            <br />
            <button type="submit" onClick={handleClick}>
              Add
            </button>
          </form>
        </div>
      )}
      <div className={projectClass}>
        {!visible && (
          <button className="editButton" onClick={() => setVisible(true)}>
            Add subtask
          </button>
        )}
        <p>
          <span className="heading">ID:</span> {project.id}
        </p>
        <br />
        <h4>{project.title}</h4>
        <br />
        <p>
          {project.description}
          <br />
          <span className="heading">SOW:</span> {project.sow}
          <br />
          <span className="heading">Start Date:</span> {project.startDate}
          <br />
          <span className="heading">Expected End Date:</span> {project.endDate}
          <br />
          <span className="heading">Budget:</span> {project.budget}
          <br />
        </p>
        {subLoaded && <GanttChart data={sub} />}
      </div>
    </div>
  );
};

export default Project;
