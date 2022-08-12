import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Admin from "./components/Admin/Admin";
import NewProject from "./components/NewProject/NewProject";
import Project from "./components/Project/Project";
import ProjectAdmin from "./components/ProjectAdmin/ProjectAdmin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/project:id" element={<Project />}></Route>
          <Route path="/admin/project:id" element={<ProjectAdmin />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/new-project" element={<NewProject />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
