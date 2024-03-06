
const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId
    },
    productID:[{
        id:{type:mongoose.Schema.Types.ObjectId,
             ref:"products" }
       
    }]

})

const WishlistModel = mongoose.model("wishlist",WishlistSchema)

module.exports=WishlistModel