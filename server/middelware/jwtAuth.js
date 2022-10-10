const jwt = require('jsonwebtoken')

module.exports = {
  jwtAuth : (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
      if(err) return res.status(403).json({message : "you don't have an authoriztion"})
      req.user = user
      next()
    })
  }
}