
  const mongoose = require('mongoose')

  const productSchema = new mongoose.Schema({

        productName:{
            type : String,
            required:true
         
        },
        image: {
            type: Array,
            required: true
        },
        stock: {
            type:Number,
            required : true

        },
        price:{
            type:Number,
            required:true
        },
        return:{
            type:[String]
        },
        MRP:{
            type : Number,
            required:true
        },
        status: {
            type:String,
        
        },
        description:{
            type :String,
            required:true
        },
        deliveryDate:{
            type:String,
            required:true   
        },
        color:{
            type:[String]
        },
        size:{
            type:[String]
        },
        category:{
            type:String,
            required:true
           
        },
        subCategory:{
            type:String,
            required:true
        },
        offer: {
            type : String,
        },
        is_blocked:{
            type:Boolean,
            default:false,
            required:true
        }


        
        // categoryId: {
        //     type: ObjectId,
        //     ref: 'categories',
        // }
  })

 const productModel = mongoose.model('products',productSchema)

 module.exports = productModel