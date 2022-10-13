const express = require('express')
const paymentController = require('../controller/paymentController')
const router = express.Router()

router.post('/create-checkout-session', paymentController.createCheckOutSession)

router.post('/razorpayCheckout', paymentController.razorPayCheckOut)
router.post('/razorPayVerification', paymentController.razorPayWebhook)

router.post('/webhook', express.json({type: 'application/json'}), paymentController.webhooks)

module.exports = router