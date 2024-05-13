let productmodel = require('../models/products');

const createProduct = async (req, res) => {
    const photo=req.file.filename
      const {name,description,sellerid} = req.body;
    try {
        let insertProduct = await productmodel.create({photo,name,description,sellerid});
        console.log(insertProduct);
        res.status(201).json({ message: 'success' , data:insertProduct});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getAllProducts= async(req,res)=>{
    try{
        let products =   await productmodel.find().populate('sellerid')
        res.status(200).json({data:products})
           }catch(err){
               res.status(500).json({message : err.message})
           }
}



const getProductById = async (req,res)=>{
 let {id} = req.params
 try{
    let products=await productmodel.findById(id)
    if(products){
        res.status(200).json({data:products})
    }
    else{
        res.status(400).json({message:'products does not exist'})
    }
    }catch(err){
        res.status(500).json({message : 'try again later'})
    }
}


const searchbyproductname =async (req, res) => {
    try {
      const Name= req.query.name.toLowerCase();
      const products = await productmodel.find({
        $or: [
          { name: Name }, 
          { sellerId: req.query.sellerId } 
        ]
      });
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



const updateProduct=async (req,res)=>{
    try{
        const { id } = req.params;
        photo= req.body.photo;
        const {name,description,sellerid} = req.body;

 let updateproduct = await productmodel.findByIdAndUpdate( id,
    { photo,name,description,sellerid },
    { new: true })
    if (!updateproduct) {
        return res.status(404).json({ message: 'product not found' });
      }
  
      res.status(200).json({ data: updateproduct });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
}
const deleteProduct=async (req,res)=>{
 let {id} = req.params
 try { 
    let deleteproduct= await productmodel.findOneAndDelete(id)
    res.status(200).json({ data: deleteproduct });
    }catch(err){
      res.status(422).json({ message: err.message })
    }
}

module.exports = { createProduct,getAllProducts,getProductById,searchbyproductname,updateProduct,deleteProduct};





