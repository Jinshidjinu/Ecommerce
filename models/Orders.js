const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({

    userID : {
      type:mongoose.Schema.Types.ObjectId
    },
    products:[{
      id :{type:mongoose.Schema.Types.ObjectId,ref:"products"},quantity:{type:Number}}],

    totalprice:Number,
    address:String,
    paymentMethod:String,
    Status:{type:String,default:'Pending'}

},{timestamps:true})

const OrderModel = mongoose.model("orders",orderSchema)
module.exports = OrderModel
