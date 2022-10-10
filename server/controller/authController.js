const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userTemplate = require("../model/user");
const profileTemplate = require("../model/profile");
const user = require("../model/user");
const profile = require("../model/profile");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

module.exports = {
  signup: (req, res) => {
    const user = new userTemplate({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    user
      .save()
      .then((data) => {
        console.log("user signed in", data);
        const profile = new profileTemplate({
          _id: data._id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        profile.save().then(data => console.log('profile created', data)).catch(err => console.log('error while saving profile', err))
        res.json({ message : "successfully created account"});
      })
      .catch((err) => {
        console.log("error while signing up", err);
        res.status(500).json({ error: err, message: "error while signing up" });
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    user
      .findOne({ email: email })
      .then((data) => {
        if (bcrypt.compareSync(password, data.password)) {
          console.log("user logged in", data._id);
          const user = {
            _id: data._id
          };
          const payload = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);
          res.json({ accessToken: payload, 
            email: data.email });
          return;
        }
        res.status(400).json({ message: "please check password" });
      })
      .catch((err) => {
        console.log("error while login", err);
        res.status(500).json({ error: err, message: "error while login" });
      });
  },
};
