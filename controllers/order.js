const ordermodel=require('../models/order')

const makeorder = async (req, res) => {
    let neworder = req.body;
    try {
        let insertorder = await ordermodel.create(neworder);
        console.log(insertorder);
        res.status(201).json({ message: 'success' , data:insertorder});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getorder = async(req,res)=>{
    try{
        let data = await ordermodel.find().populate(["userid","productsid"]);
         res.status(201).json({success:true ,data : data});  
          }catch (err) { 
            return res.status(400).send(`Error ${err}`);
           }    
}

const editOrder= async(req,res)=>{
    try{
        const { id } = req.params;

 let updateproduct = await ordermodel.findByIdAndUpdate( id,
    req.body,
    { new: true })
    if (!updateproduct) {
        return res.status(404).json({ message: 'product not found' });
      }
  
      res.status(200).json({ data: updateproduct });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
}

const removeOrder= async(req,res)=>{
    const id = req.params.id;
    if(!id){
      return res.status(400).json({error:"No valid id provided"})
    }
    let data =await ordermodel.findByIdAndDelete(id)
    if(!data){
       return res.status(400).json({error:`No record found for given id :${id}`})
    }
    res.status(200).json('Data Deleted Succesfully');

}


module.exports={makeorder,getorder,editOrder,removeOrder}