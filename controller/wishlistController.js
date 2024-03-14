
const { default: mongoose } = require('mongoose')
const wishlistSchema = require('../models/wishlist')

module.exports={


wishlistGET:async(req,res)=>{
   try{
    const userid = req.session.email?._id
    const productshow = await wishlistSchema.findOne({userID:userid}).populate('product.id')
    res.render('UserSide/wishlist',{productshow})
   }catch(error){
   console.log(error);
   }
    



},
addwishlistGET: async (req, res) => {
    try {
        if (req.session.email) {
            const userID = req.session.email?._id;
            const productID = req.query.id;
            const proid = new mongoose.Types.ObjectId(productID);
            let wishlist = await wishlistSchema.findOne({ userID });
            // wishlist.product = wishlist.product || [];
            if(wishlist){
                const existingProduct = wishlist.product.find(product => product.id && product.id.equals(proid));
                if (existingProduct) {
                    const existWishlist = await wishlistSchema.findByIdAndUpdate(
                        { _id: wishlist._id },
                        { $pull: { product: { id: proid } } },
                        { new: true }
                    );     
                   
                    res.status(200).json({ success :false })    
                } else {
                    wishlist.product.push({ id: proid });
                    await wishlist.save();
                    res.status(200).json({ success: true });
                }
            }else{
                const wishSchema = new wishlistSchema({
                    userID:userID,
                    product:[{ id: proid }]
                })
                await wishSchema.save()   
            }   
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
},

wishlistPOST:async(req,res)=>{
     userID = req.session.email._id
    const  productid = new mongoose.Types.ObjectId(req.query.id)
    console.log(productid);
    try{
        const findwishlist = await wishlistSchema.updateOne(

            { userID : userID },
            {$pull: { product: { id:productid } } }
        );
        res.json({success:true})
    }catch(error){
       console.log(error);
       res.status(500).json({ success: false, error: "Server Error" });
    }
}
}




















