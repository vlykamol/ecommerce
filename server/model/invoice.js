const mongoose = require('mongoose')


const invoiceTemplate = new mongoose.Schema({
  order_id : {
    type: String
  },
  user: {
    _id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    email: {
      type: String,
      required: true
    }
  },
  payment_id: {
    type: String
  },
  amount : {
    type: Number,
    required :  true
  },
  date: {
    type : Date,
    default : Date.now
  }
})

module.exports = mongoose.model('invoice', invoiceTemplate)