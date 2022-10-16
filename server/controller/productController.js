const product = require('../model/product')
const productTemplate = require('../model/product')
const axios = require('axios')

module.exports = {
  getProducts: (req, res) => {
    // axios.get('https://fakestoreapi.com/products').then(r => res.json(r.data)).catch(err => console.log(err))
  
    product.find().then(r => {
      res.json(r)
    }).catch(err => console.log(err))
  },

  getProduct : (req, res) => {
    console.log(req.params._id);
    const _id = req.params._id
    product.findById(_id).then(data => {
      console.log('product--', data);
      res.json(data)
    }).catch(err => {
      console.log('error at getting product', err);
      res.status(500).json({message : "product not found"})
    })
  },

  addProduct : (req, res) => {
    // const product = new productTemplate({
    //   title : p.title,
    //   description: p.description,
    //   price : p.price,
    //   images : [{url : p.image}],
    //   category: p.category,
    //   ratings: { rate : p.rating.rate, count: p.rating.count},
    //   stock: 100
    // })
    // product.save().then(data => {
    //   console.log('product added', data);
    // }).catch(err => {
    //   console.log('error while adding product', err);
    // })
  },

  addProducts : (req, res) => {
    // axios.get('https://fakestoreapi.com/products').then(r =>{
    //     r.data.map(async (p) => {
    //       const product = new productTemplate({
    //       title : p.title,
    //       description: p.description,
    //       price : p.price,
    //       images : [{url : p.image}],
    //       category: p.category,
    //       ratings: { rate : p.rating.rate, count: p.rating.count},
    //       stock: 100
    //     })
    //     await product.save()
    //     console.log('products, added');
    //   })
    // }).catch(err => console.log(err))
  }
}