let sellermodel=require('../models/seller')
let productmodel = require('../models/products')

const createseller = async (req, res) => {
    let newseller = req.body;
    try {
        let insertseller = await sellermodel.create(newseller);
        console.log(insertseller);
        res.status(201).json({ message: 'success' , data:insertseller});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllseller= async(req,res)=>{
    try{
        let seller =   await sellermodel.find()
        res.status(200).json({data:seller})
           }catch(err){
               res.status(500).json({message : err.message})
           }
}

const getproductByseller = async (req,res)=>{
    try {
        const products = await productmodel.find({ sellerid: req.params.id }).populate('sellerid');
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   }

   const createproductbyid= async(req,res)=>{
    try {
        const { id } = req.params;
        const seller = await sellermodel.findById(id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found.' });
      }
        const product = await productmodel.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    };
   

   const updateproductbyseller =async (req,res)=>{
    try {
        const product = await productmodel.findByIdAndUpdate({ _id: req.params.productId, seller: req.params.sellerId }, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteproductbyseller =async (req,res)=>{
    try {
        await productmodel.findByIdAndDelete({_id: req.params.productId,
            seller: req.params.sellerId});
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
   }

module.exports={createseller,getAllseller,getproductByseller,createproductbyid,updateproductbyseller,deleteproductbyseller}