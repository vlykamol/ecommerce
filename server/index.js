const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`database connected`);
}).catch(err =>{
  console.log('error while connecting database', err);
})

app.use(express.json())
app.use(express.static(path.join(__dirname, './dist/')))

//when froentend is running on different port
app.use(cors())

const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const productRoute = require('./route/productRoute')
const paymentRoute = require('./route/paymentRoute')
const { jwtAuth } = require('./middelware/jwtAuth')
//routes
app.use('/auth', authRoute)
app.use('/user', jwtAuth, userRoute)
app.use('/products', productRoute)
app.use('/payment', paymentRoute)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})

server.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
})


// webhook to work on devlopment use ngork to ssh http 8080 

