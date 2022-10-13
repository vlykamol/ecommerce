const mongoose = require('mongoose')

const orderTemplate = new mongoose.Schema({
  user: {
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    email:{
      type: String
    }
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
  }],
  amount : {
    type: Number,
    required :  true
  },
  date: {
    type : Date,
    default : new Date.now()
  }
})