let express = require('express')
let router= express.Router()
const{createuser,edituser,getalluser,deleteteuser,login} = require('../controllers/user')
const { auth } = require('../middleware/auth')




router.post('/', createuser)
router.get('/',auth, getalluser)
router.patch('/:id',auth, edituser)
router.delete('/:id',auth, deleteteuser)
router.post('/login',login)

module.exports=router