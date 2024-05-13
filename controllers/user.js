let usrmodel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createuser = async (req, res) => {
    let newuser = req.body;
    try {
        let insertuser = await usrmodel.create(newuser);
        console.log(insertuser);
        res.status(201).json({ message: 'success' , data:insertuser});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



const getalluser=async(req,res)=>{
    try{
let users=await usrmodel.find()
res.status(200).json({data:users})
    }catch(err){
        res.status(400).json({message:'todo does not exist'})
    }
}

const edituser = async (req, res) => {
    const { id } = req.params;
    const {  password, firstName, lastName,email} = req.body;
  
    try { 
      let updateuser= await usrmodel.findByIdAndUpdate(
        id,
        { password, firstName, lastName,email },
        { new: true }
      );
  
      if (!updateuser) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.status(200).json({ data: updateuser });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  };


  
 const login= async (req,res)=>{
  let {email,password}=req.body
 
  if(!email||!password){
  return res.status(400).json({message:"you must provide email and password"})
  }
 let user= await usrmodel.findOne({email:email})
 if(!user){
   return res.status(404).json({message:"invalid email or password"})
 }
 let isvalid = await bcrypt.compare(password,user.password)
 if(!isvalid){
   return res.status(401).json({message:"invalid email or password"})
 }

let token=  await jwt.sign({data:{email:user.email,id:user._id}}, 'JWT_SECRET=this_is_my_jwt_secret_in_my_project',{expiresIn:'1h'})
 res.status(200).json({message:'success',token:token})
   }

   const deleteteuser=async(req,res,next)=>{
    const { id } = req.params;
    try { 
    let deleteuser= await usrmodel.findOneAndDelete(id)
    res.status(200).json({ data: deleteuser });
    }catch(err){
      next(err)
      //res.status(422).json({ message: err.message })
    }
  }



module.exports={createuser,edituser,getalluser,deleteteuser,login} 


//,role:user.role