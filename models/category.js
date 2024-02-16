const { default: mongoose } = require("mongoose")

var require = ('mongoose')

var CategorySchema = new mongoose.Schema({

    category:{
        type:String,
       
    },
    subcategory:{
        type:Array
    }
})


const categoryModel= mongoose.model("PrdctCategories",CategorySchema)

module.exports = categoryModel