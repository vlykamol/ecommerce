const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()

router.get('/profile', userController.getProfile)
router.post('/profile', userController.updateProfile)

// router.get('/address', )
// router.post('/address', )

// router.get('/cart', )
// router.post('/cart', )

// router.get('/invoice', )

module.exports = router