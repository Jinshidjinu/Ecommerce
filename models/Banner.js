
const mongoose = require('mongoose')

const bannerSchema = new  mongoose.Schema({

    title:{
        type : String,
        required :true
    },
    description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true

    },
    offer:{
        type:Number,
    },
    startdate:{
        type:String,
        required:true
    },
    expirydate:{
        type:String,
        required:true
    },
  
})

const bannermodel = mongoose.model('Banner',bannerSchema)

module.exports = bannermodel