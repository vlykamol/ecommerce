const express = require('express')
const http = require('http')
const axios = require('axios')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const PORT = 8080 || process.env.PORT

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log(`database connected`);
}).catch(err =>{
  console.log('error while connecting database', err);
})

app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist')))

//when froentend is running on different port
app.use(cors())


const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const { jwtAuth } = require('./middelware/jwtAuth')
//routes
app.use('/auth', authRoute)
app.use('/user', jwtAuth, userRoute)


const product = require('./model/product')
app.get('/products', (req, res) => {
  // axios.get('https://fakestoreapi.com/products').then(r => res.json(r.data)).catch(err => console.log(err))

  product.find().then(r => {
    res.json(r)
  }).catch(err => console.log(err))
})

// r.data.map(p => {
//   const product = new productTemplate({
//     title : p.title,
//     description: p.description,
//     price : p.price,
//     images : [{url : p.image}],
//     category: p.category,
//     ratings: { rate : p.rating.rate, count: p.rating.count},
//     stock: 100
//   })
//   product.save()
//   console.log('products, added');
// })


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client//dist/index.html'))
})

server.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
})