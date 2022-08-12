const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { email, pass } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Email does not exist",
    });
  } else {
    bcrypt.compare(pass, user.password, (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          success: true,
          message: "Login Successful",
          user: user,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Incorrect Password",
        });
      }
    });
  }
}

module.exports = login;
