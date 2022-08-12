const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function adminLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      success: false,
      message: "email does not exist",
    });
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          success: true,
          message: "Login Successful",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Login Failed",
        });
      }
    });
  }
}

module.exports = adminLogin;
