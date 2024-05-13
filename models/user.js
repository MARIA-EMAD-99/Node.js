const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userschema =mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        validate:{
          validator:function(val){
            return /^[a-zA-Z]{3,8}(@)(gmail|yahoo)(.com)$/.test(val)
          },
          message:()=>`invaild email address`
        }
      },
      password: {
        type: String,
        required: true,
      },
})

userschema.pre('save',async function(next){

    let salt =await bcrypt.genSalt(10)
    let hashpas =await bcrypt.hash(this.password,salt)
    this.password=hashpas
     next()
   })

let usrmodel=mongoose.model('user',userschema)
module.exports= usrmodel
