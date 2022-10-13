const express = require('express')
const paymentController = require('../controller/paymentController')
const router = express.Router()

//stripe payment 
// router.post('/create-checkout-session', paymentController.createCheckOutSession)
// router.post('/webhook', express.json({type: 'application/json'}), paymentController.webhooks)

//razorpay payment
router.post('/razorpayCheckout', paymentController.razorPayCheckOut)
router.post('/razorPayVerification', paymentController.razorPayWebhook)


module.exports = router