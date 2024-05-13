let express = require('express')
let router= express.Router()
const multer=require("multer");
const path=require("path");
const {createProduct,getAllProducts,getProductById, searchbyproductname,updateProduct,deleteProduct}=require('../controllers/products')
const { auth } = require('../middleware/auth')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename: function (req, file, cb) {
      cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname) 
    }    
})
const upload=multer({storage:storage})
router.get('/search', auth, searchbyproductname) 

router.post('/',upload.single( 'photo' ), createProduct)
router.get('/',auth, getAllProducts)
router.get('/:id',getProductById)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)






module.exports= router