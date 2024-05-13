const mongoose = require('mongoose')
const sellerschema = mongoose.Schema({
    name:{
        type: String,
         required: true
    }
})

const sellermodel=mongoose.model('seller',sellerschema)
module.exports= sellermodel