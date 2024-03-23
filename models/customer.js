const { default: mongoose } = require("mongoose")

var require=('mongoose')

var customer = new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false,
        required:true

    },
    createdAt : {
        type : Date,
        default:Date.now()
    }
})



const customerModel= mongoose.model("customer",customer)

module.exports = customerModel

