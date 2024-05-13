const express = require('express');
const app = express();
const mongoose =require('mongoose')
const productRoutes = require('./routes/products');
const sellerRoutes = require('./routes/seller');
const userRoutes = require('./routes/user')
const orderRoutes= require('./routes/order')


mongoose.connect('mongodb://127.0.0.1:27017/projectnode').then(()=>{
console.log("successfully to.....")
}).catch(()=>{
    console.log("err")
})
app.use(express.json());
app.use('/products',productRoutes)
app.use('/seller',sellerRoutes)
app.use('/user',userRoutes)
app.use('/order',orderRoutes)



app.listen(6000, () => {
    console.log("Server running on port 6000");
});