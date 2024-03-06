
 const mongoose = require('mongoose')



 const addressSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },


    address:[{
      
         Locality:{
            type:String,
            required:true
         },
         country:{
            type: String,
            required: true 
         },
         District:{
            type:String,
            required: true 

         },
         state:{
            type:String,
            required: true 
         },
         City:{
            type:String,
            required: true 
         },
         HouseName:{
            type:String,
            required: true 
         },
         HouseNo:{
            type:String,
            required: true 
         },
         pincode: {
            type: String,
            required: true
          },


    }]


 })

 
const AddressModel= mongoose.model("Address",addressSchema)

module.exports=AddressModel