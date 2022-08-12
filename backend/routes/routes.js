const { Router } = require("express");

const login = require("../controllers/login");
const register = require("../controllers/register");
const adminLogin = require("../controllers/adminLogin");
const resetPassword = require("../controllers/resetPassword");
const newProject = require("../controllers/newProject");
const getProjects = require("../controllers/getProjects");
const updateProject = require("../controllers/updateProject");
const addSubtasks = require("../controllers/addSubtasks");

const router = Router();

//GET Requests
router.get("/", (req, res) => {
  res.send("okay");
});

router.get("/get-projects", getProjects);

//POST Requests
router.post("/login", login);

router.post("/login", adminLogin);

router.post("/register", register);

router.post("/new-project", newProject);

router.post("/update-project", updateProject);

router.post("/add-subtask", addSubtasks);

router.post("/reset-password", resetPassword);

module.exports = router;
