 mongoose = require('mongoose')
const orderschema = mongoose.Schema({
    createdDate: { 
        type: Date, 
        default:Date.now 
    },
    productsid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products',
         required: true 
    },

    userid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
         required: true
    }
})

const ordermodel=mongoose.model('order',orderschema)
module.exports= ordermodel