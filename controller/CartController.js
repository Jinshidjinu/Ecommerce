const { default: mongoose, Types } = require('mongoose')
const cartSchema = require('../models/Cart')
const productSchema =require('../models/products')
const { Axios } = require('axios')


module.exports={



   cartGET: async (req, res) => {
      if (req.session.email) {
        try {
          const userID = req.session.email._id;
    
          const productview = await cartSchema.findOne({ userID: userID }).populate('productID.id');
          if (productview && productview.productID) {
            const subtotal = productview.productID.reduce((acc, index) => {
                return (acc += index.id.MRP * index.quantity);
            }, 0);

            let discountTotal = 0; // Initialize discountTotal here

            discountTotal = productview.productID.reduce((acc, index) => {
                return (acc += index.id.price * index.quantity);
            }, 0);

            res.render('UserSide/cart', { productview, subtotal, discountTotal });
        } else {
            // Handle the case where productview or productview.productID is null or undefined
            res.render('UserSide/cart', { productview: null, subtotal: 0, discountTotal: 0 });
        }
        } catch (error) {
          console.log(error);
        }
      }
    },
    
      
   
   addtocartGET: async (req, res) => {
       
      try{
         const userID = req.session.email._id;
         if(!userID){
            return res.status(401).json({error:"Unauthorized",message:'user is not logged in '})
         }else{
            const product_ID = req.query.id;
            const id = new mongoose.Types.ObjectId(product_ID)
            const cart = await cartSchema.findOne({userID})
            if(!cart){
               const cartNew = new cartSchema({userID,productID:[{id,quantity:1}]})
               await cartNew.save()
               res.json({success:true,count:1})
           
            }else{
               const existingProduct = cart.productID.find(productID => productID.id.equals(id));

               if (existingProduct) {
                   // If the product is already in the cart, update its quantity
                   existingProduct.quantity += 1;
               } else {
                   // If the product is not in the cart, add it as a new entry
                   cart.productID.push({ id, quantity: 1 });
               }
                    
               await cart.save();
               return res.json({ success: true, count: cart.productID.length });
            }
         }
      }catch(error){
        console.log(error);
      }
  

},


deletecartPOST:async(req,res)=>{
         const Productid = new mongoose.Types.ObjectId(req.query.id)
         console.log(Productid);
         const userid = req.session.email._id
   try{

      const result = await cartSchema.updateOne(
         { userID: userid },
         { $pull: { productID: { id: Productid } } }
       );

     res.json({success:true})

   }catch(error){
      console.log(error)
      res.status(500).json({ success: false, error: "Server Error" });
   }

},


updateQuantity:async(req,res)=>{

   try {
      const userID = req.session.email?._id
      const userid=new mongoose.Types.ObjectId(userID)
      const productid = req.body.productid;
      const id = new mongoose.Types.ObjectId(productid)
      const qty = req.body.qty;
      const abc=  await cartSchema.updateOne(
      { userID: userid, "productID.id": id },
      { $set: { "productID.$.quantity": qty } },
        );
      res.status(200).json({success:true,message:'quantity updated'})
    } catch (err) {
      console.log("cart quantity Update", err);
    }

}


} 