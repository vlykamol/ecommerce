const mongoose = require("mongoose");

const profileTemplate = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName : {
    type: String,
    required : true
  },
  lastName : {
    type: String,
    required : true
  },
  contact: {
    type: Number,
  },
  DOB: {
    type: Date,
  },
});

module.exports = mongoose.model("profile", profileTemplate);
