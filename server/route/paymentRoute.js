const express = require('express')
const paymentController = require('../controller/paymentController')
const router = express.Router()

router.post('/create-checkout-session', paymentController.createCheckOutSession)

module.exports = router