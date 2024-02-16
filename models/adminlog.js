var mongoose=require('mongoose')

var adminside= new mongoose.Schema({
     name:{
       type:String,
       required:true
      },

      email:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      adminkey:{
        type:String,
        required:true
      }
      

})


const adminModel= mongoose.model("admin",adminside)

module.exports=adminModel