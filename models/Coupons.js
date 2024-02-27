
const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
  
    discount:{
        type:Number,

    },
    minOrderAmount:{
        type:Number,
        required:true
    },
    maxOrderAmount:{
        type:Number,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },

})

const couponSchemaModel = mongoose.model('Coupons',couponSchema)

module.exports = couponSchemaModel