const mongoose = require('mongoose')


const addressTemplate = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  addressLine1:{
    type: String,
    required : true
  },
  addressLine2:{
    type: String,
  },
  city:{
    type: String,
    required: true
  },
  postalCode:{
    type: Number,
    required : true
  },
  country:{
    type: String,
    required : true
  }
})


module.exports = mongoose.model('address', addressTemplate)