const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const server = http.createServer(app)
const PORT = 8080

mongoose.connect('mongodb://localhost:27017/ecommerce').then(() => {
  console.log(`database connected`);
}).catch(err =>{
  console.log('error while connecting database', err);
})

app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist')))

//when froentend is running on different port
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const authRoute = require('./route/authRoute')
//routes
app.use('/auth', authRoute)


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client//dist/index.html'))
})

server.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
})