let express = require('express')
let router= express.Router()
const {makeorder,getorder,editOrder,removeOrder}= require('../controllers/order')
const { auth } = require('../middleware/auth')


router.post('/', auth, makeorder)
router.get('/',getorder)
router.patch('/:id', editOrder)
router.delete( '/:id', removeOrder)


module.exports= router

