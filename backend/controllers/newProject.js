const Project = require("../models/project");

const newProject = async (req, res) => {
  const details = req.body;
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  details.startDate = dd + "." + mm + "." + yyyy;
  details.status = "active";
  details.subTasks = [];
  const project = new Project(details);
  project
    .save()
    .then((result) => {
      res.status(201).send("new project created");
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};

module.exports = newProject;
