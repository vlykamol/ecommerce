const userTemplate = require('../model/user')
const user = require('../model/user')
module.exports = {
  signup : (req, res) => {
    const user = new userTemplate({
      firstName: req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
    })

    user.save().then(data => res.json(data)).catch(err => {
      console.log('error while signing up', err);
      res.status(500).json({"error": err, "message" : "error while signing up"})
    })
  },

  login : (req, res) => {
    const { email, password } = req.body;
    user.findOne({email: email}).then(data => {
      if(data.password === password){
        console.log('user logged in', data);
        res.json({
          firstName : data.firstName, 
          lastName : data.lastName,
          email : data.email
        })
        return
      }
      res.status(400).json({"message": "please check password"})
    }).catch(err => {
      console.log('error while login', err);
      res.status(500).json({"error": err, "message" : "error while login"})
    })
  }
}