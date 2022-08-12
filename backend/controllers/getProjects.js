const project = require("../models/project");

const getProjects = async (req, res) => {
  if (req.query.pmo) {
    const pmo = req.query.pmo;
    await project
      .find({ pmo: pmo }, (err, docs) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(200).json({
            success: true,
            data: docs,
          });
        }
      })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } else {
    await project
      .find({}, (err, docs) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(200).json({
            success: true,
            data: docs,
          });
        }
      })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  }
};

module.exports = getProjects;
