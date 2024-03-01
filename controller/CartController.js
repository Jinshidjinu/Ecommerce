const { default: mongoose, Types } = require('mongoose')
const cartSchema = require('../models/Cart')
const productSchema =require('../models/products')

module.exports={




   cartGET : async(req,res)=>{
      if (req.session.email) {
         
         try{
            const userID = req.session.email
   
            const productview = await cartSchema.findOne({userID:userID}).populate('productID.id')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
             res.render('UserSide/cart',{productview})
         }catch(error){
            console.log(error)
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
               console.log(cartNew);
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
      console.log('hh');
      const userID = req.session.email._id
      const productID = req.query.id
      const quantity = req.query.qty
      // console.log(userID);
      // console.log(productID);       
      console.log(`qty----`,quantity); 
      // res.redirect('/cart')
      
    const Quantitynew = await cartSchema.findOne({userID:userID})
   } catch (error) {
      
   }
   


    
    

}


}