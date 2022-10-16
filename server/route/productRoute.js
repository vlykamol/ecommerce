const express = require('express')
const productController = require('../controller/productController')
const { jwtAuth } = require('../middelware/jwtAuth')

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:_id', productController.getProduct)
// router.post('/', jwtAuth, productController.addProducts)

module.exports = router