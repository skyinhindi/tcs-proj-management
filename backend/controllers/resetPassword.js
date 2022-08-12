const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function changePassword(req, res) {
  const { email, oldpass, newpass } = req.body;
  const user = await User.findOne({ email });
  bcrypt.compare(oldpass, user.password, (err, result) => {
    if (err) throw err;
    if (result) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newpass, salt, function (err, hash) {
          if (err)
            res.status(500).json({
              success: false,
              message: "Change Password failed :" + err.message,
            });
          else {
            User.findOneAndUpdate(
              { email },
              { password: hash },
              { upsert: true },
              function (err, doc) {
                if (err) {
                  res.status(500).json({
                    success: false,
                    message: "Change Password failed: " + err.message,
                  });
                } else {
                  res.status(200).json({
                    success: true,
                    message: "Password Changed",
                  });
                }
              }
            );
          }
        });
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Incorrect Current Password",
      });
    }
  });
}

module.exports = changePassword;
