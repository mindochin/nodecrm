const express = require('express')
const router = express.Router()
const controllers = require('../controllers/order')

router.get('/', controllers.getAll)
router.post('/', controllers.create)

module.exports = router