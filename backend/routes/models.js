const express = require('express')
const {
  createModel,
  getModel,
  updateModel
} = require('../controllers/modelController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//GET a model
router.get('/:id', getModel)

// POST a new model
router.post('/', createModel)

// UPDATE a model
router.patch('/:id', updateModel)


module.exports = router