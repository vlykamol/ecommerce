const profile = require('../model/profile')
const profileTemplate = require('../model/profile')
const cart = require('../model/cart')
const cartTemplate = require('../model/cart')
const addres = require('../model/address')
const addressTemplate = require('../model/address')
const address = require('../model/address')
const order = require('../model/order')


module.exports = {
  getProfile : async (req, res) => {
    const _id = req.user._id
    profile.findById(_id).then(data => {
      // console.log('profile data', data);
      res.json(data)
    }).catch(err => {
      // console.log('error at getting profile', err);
      res.status(401).json({error : err.message})
    })
  }, 

  updateProfile: (req, res) => {
    const _id = req.user._id
    const newProfile = new profileTemplate({...req.body})
    // console.log('newProfile', newProfile);
    profile.findOneAndUpdate(_id, newProfile, {upsert
    : true, new: true}).then(data => {
      // console.log('updated data', data);
      res.json(data)
    }).catch(err => {
      // console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  },

  getCart: (req, res) => {
    const _id = req.user._id
    cart.findById(_id).populate({path: 'products._id'}).then(data => {
      // console.log('cart data ---', data);
      res.json(data)
    }).catch(err => {
      // console.log('error at getting cart', err);
      res.status(401).json({error : err.message})
    })
  },

  updateCart: (req, res) => {
    const _id = req.user._id
    const tempCart = req.body.cart
    const newCart = new cartTemplate({
      products : [...tempCart.map(c => {
        return {_id : c._id , quantity : c.quantity}
      })]
    })
    // console.log('newCart', newCart);
    cart.findOneAndUpdate(_id, newCart, {upsert
    : true, new: true}).populate({path: 'products._id'}).then(data => {
      // console.log('updated data', data);
      res.json(data)
    }).catch(err => {
      // console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  },

  getAddress : (req, res) => {
    const _id = req.user._id
    address.findById(_id).then(data => {
      // console.log('address', data);
      res.json(data)
    }).catch(err => res.status(401).json({error : err.message}))
  },

  updateAddress : (req, res) => {
    const _id = req.user._id
    const tempAdd = req.body
    const newAddres = new addressTemplate({
      addressLine1: tempAdd.addressLine1,
      addressLine2: tempAdd.addressLine2,
      city : tempAdd.city,
      postalCode : tempAdd.postalCode,
      country : tempAdd.country
    })
    addres.updateOne({_id}, newAddres, {upsert
    : true, new : true}).then(data => {
      // console.log('updated address', data);
      res.json(data)
    }).catch(err => {
      // console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  },

  getOrders : (req, res) => {
    const _id = req.user._id
    console.log('user id', _id);
    order.find({user_id : _id, status: true}).then(data => {
      // console.log('orders : ', data)
      res.json(data)
    }).catch(err => {
      // console.log('order err', err.message)
      res.status(500).json({message : "orders not found"})
    })
  }
}