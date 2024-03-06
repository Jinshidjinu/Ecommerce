
const { default: mongoose } = require('mongoose')
const wishlistSchema = require('../models/wishlist')

module.exports={


wishlistGET:async(req,res)=>{

res.render('UserSide/wishlist')

},
addwishlistGET: async (req, res) => {
    try {
        if (req.session.email) {
            const userID = req.session.email._id;
            const productID = req.query.id;
            const proid = new mongoose.Types.ObjectId(productID);

            let wishlist = await wishlistSchema.findOne({ userID });

            if (!wishlist) {
                const wishlistNew = new wishlistSchema({ userID, product: [{ id: proid }] });
                await wishlistNew.save();
                res.status(200).json({ success: true });
            } else {
                wishlist.product = wishlist.product || [];

                const existingProduct = wishlist.product.find(product => product.id && product.id.equals(proid));

                if (existingProduct) {
                    const existWishlist = await wishlistSchema.findByIdAndUpdate(
                        { _id: wishlist._id },
                        { $pull: { product: { id: proid } } },
                        { new: true }
                    );
                } else {
                    wishlist.product.push({ id: proid });
                    await wishlist.save();
                }

                res.status(200).json({ success: true });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


}




















