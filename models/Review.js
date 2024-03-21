

const mongoose = require('mongoose')
const reviewSchema =new mongoose.Schema({

   productID:{type:mongoose.Schema.Types.ObjectId,ref:"products",required:true},
   review:[{UserId:{type:mongoose.Schema.Types.ObjectId,ref:'customer'},comment:{type:String}   }]

})

const reviewModel = mongoose.model('Review',reviewSchema)
module.exports = reviewModel