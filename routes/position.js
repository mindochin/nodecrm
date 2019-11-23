const express = require('express')
const router = express.Router()
const controllers = require('../controllers/position')

router.get('/:categoryId', controllers.getByCategoryId)
router.post('/', controllers.create)
router.patch('/:id', controllers.update)
router.delete('/:id', controllers.remove)

module.exports = router