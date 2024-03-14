
const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({

    CouponCode:{
        type:String,
     
    },
  
    discount:{
        type:Number,

    },
    minOrderAmount:{
        type:Number,
       
    },
    maxOrderAmount:{
        type:Number,
      
    },
    startdate:{
        type:Date,
       
    },
    expiryDate:{
        type:Date,
       
    },

})

const couponSchemaModel = mongoose.model('Coupons',couponSchema)

module.exports = couponSchemaModel