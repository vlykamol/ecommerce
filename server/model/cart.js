const mongoose = require('mongoose')

const cartTemplate = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  products:[{
    _id:{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type : Number,
      required : true
    }
  }]
})

module.exports = mongoose.model('cart', cartTemplate)