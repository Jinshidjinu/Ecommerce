const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({

    userID : {
      type:mongoose.Schema.Types.ObjectId
    },
    products:[{
       productID :{type:mongoose.Schema.Types.ObjectId,ref:"products"},quantity:{type:Number},_id:false}],

    totalprice:Number,
    address:String,
    paymentMethod:String,
    Status:String

},{timestamps:true})

const OrderModel = mongoose.model("orders",orderSchema)
module.exports = OrderModel
