const Project = require("../models/project");

const updateProject = async (req, res) => {
  const { id, description, sow, endDate, budget, pmo } = req.body;
  Project.findOneAndUpdate(
    { id },
    { id: id, description: description, sow: sow, budget: budget, pmo: pmo },
    { upsert: true },
    function (err, doc) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Could not update project: " + err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Updated project",
        });
      }
    }
  );
};

module.exports = updateProject;
