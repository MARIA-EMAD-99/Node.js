const mongoose = require('mongoose')

const productsschema = mongoose.Schema({
    name:{
        type: String,
         required: true
    },
    description: { 
        type: String
    },
    photo: { 
        type: String
     },
    creationDate: { 
        type: Date,
         default: Date.now
         },
         sellerid: { type: mongoose.Schema.Types.ObjectId,
         ref: 'seller',
         required: true 
         },

})
const productmodel=mongoose.model('products',productsschema)
module.exports= productmodel