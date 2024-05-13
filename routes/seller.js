let express = require('express')
let router= express.Router()
const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename: function (req, file, cb) {
      cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname) 
    }    
})
const upload=multer({storage:storage})

const {createseller,getAllseller,getproductByseller,createproductbyid,updateproductbyseller,deleteproductbyseller}=require('../controllers/seller')
router.post('/', createseller)
router.get('/',getAllseller)
router.get('/:id/products',getproductByseller)
router.post('/:id/products',createproductbyid)
router.patch('/:sellerId/products/:productId', updateproductbyseller)
router.delete('/:sellerId/products/:productId', deleteproductbyseller)




module.exports= router