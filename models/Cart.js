
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId
    },
    productID:[{
        id:{type:mongoose.Schema.Types.ObjectId,
             ref:"products" },
        quantity:Number,
    }]

})

const cartModel = mongoose.model("Cart",cartSchema)

module.exports=cartModel