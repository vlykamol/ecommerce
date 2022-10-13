const mongoose = require('mongoose')

const orderTemplate = new mongoose.Schema({
  order_id:{
    type: String,
  },
  products:[{
    _id:{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type : Number,
    }
  }],
  status: {
    type : Boolean
  },
  date: {
    type : Date,
    default : Date.now
  }
})

module.exports = mongoose.model('order', orderTemplate)