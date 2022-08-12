const Project = require("../models/project");

const addSubtasks = async (req, res) => {
  const { id, subtasks } = req.body;
  Project.findOneAndUpdate(
    { id },
    { subTasks: subtasks },
    { upsert: true },
    function (err, doc) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Could not add subtask: " + err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Subtask added",
        });
      }
    }
  );
};

module.exports = addSubtasks;
