const profile = require('../model/profile')
const profileTemplate = require('../model/profile')
const cart = require('../model/cart')
const cartTemplate = require('../model/cart')
const { default: mongoose, model } = require('mongoose')

module.exports = {
  getProfile : async (req, res) => {
    const _id = req.user._id
    profile.findById(_id).then(data => {
      console.log('profile data', data);
      res.json(data)
    }).catch(err => {
      console.log('error at getting profile', err);
      res.status(401).json({error : err.message})
    })
  }, 

  updateProfile: (req, res) => {
    const _id = req.user._id
    const newProfile = new profileTemplate({...req.body})
    console.log('newProfile', newProfile);
    profile.findOneAndUpdate(_id, newProfile, {upsert
    : true, new: true}).then(data => {
      console.log('updated data', data);
      res.json(data)
    }).catch(err => {
      console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  },

  getCart: (req, res) => {
    const _id = req.user._id
    cart.findById(_id).populate({path: 'products._id'}).then(data => {
      console.log('cart data ---', data);
      res.json(data)
    }).catch(err => {
      console.log('error at getting cart', err);
      res.status(401).json({error : err.message})
    })
  },

  updateCart: (req, res) => {
    const _id = req.user._id
    const tempCart = req.body.cart
    console.log('cart --', tempCart);
    const newCart = new cartTemplate({
      products : [...tempCart.map(c => {
        return {_id : c._id , quantity : c.quantity}
      })]
    })
    console.log('newCart', newCart);
    cart.findOneAndUpdate(_id, newCart, {upsert
    : true, new: true}).populate({path: 'products._id'}).then(data => {
      console.log('updated data', data);
      res.json(data)
    }).catch(err => {
      console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  }
}