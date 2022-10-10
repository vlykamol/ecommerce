const mongoose = require("mongoose");

const productTemplate = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  images: [
    {
      url: {
        type: String,
      },
    },
  ],
  ratings: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});

module.exports = mongoose.model("product", productTemplate);
