const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { email } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.json({
      success: false,
      message: "An account exists with this EMAIL ID",
    });
  }
  const details = req.body;
  const user = new User(details);
  const { pass } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash) {
      user.password = hash;
      user
        .save()
        .then((result) => {
          res.status(201).send("signup success");
        })
        .catch((err) => {
          console.log(err);
          res.send(err.message);
        });
    });
  });
}

module.exports = register;
