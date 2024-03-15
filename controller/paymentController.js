
const OrderModel = require('../models/Orders')
const productModel = require('../models/products')
const categoryModel = require('../models/category')
const cartModel = require('../models/Cart')
const AddressModel = require('../models/Address')
const CouponsModel = require('../models/Coupons')
const customerModel = require('../models/customer')

 module.exports={

     checkOutGET :async(req,res)=>{
        try{
            let totalPrice;
            const userID = req.session.email?._id
            const addressView = await AddressModel.findOne({user:userID})
            const usersData   = await customerModel.findOne({_id:userID})
           
            const prodid = req.query.id
            req.session.prodid = prodid                         
          
            let mrp = 0
            let discount;
            if(!req.session.prodid){
              const cartData = await cartModel.findOne({userID:userID}).populate("productID.id")
               totalPrice = cartData.productID.reduce((acc,data)=>{
                 mrp += data.id.price * data.quantity
                return acc += data.id.MRP * data.quantity
              },0)
              discount = mrp 
              // console.log('dis',discount)
              // console.log('mrp',mrp);
             
            }else{
              const productID = req.session.prodid
              const productData = await productModel.findById(productID)
              totalPrice = productData.price
              mrp = productData.MRP
          
            }
            const couponData = await CouponsModel.findOne({
              minOrderAmount: { $lte: totalPrice }, // Minimum order amount should be greater than or equal to total price
              maxOrderAmount: { $gte: totalPrice }  // Maximum order amount should be less than or equal to total price
            });
          const CouponDetails = [couponData]
            res.render('UserSide/checkout',{addressView,usersData,totalPrice,discount,mrp,CouponDetails})

        }catch(error){
        console.log(error)
        }
        
     },

     ApplyCouponPOST:async(req,res)=>{
        try {
          
          const couponCode = req.body.couponCode
          const amount = req.body.Amount
          const coupon = await CouponsModel.findOne({CouponCode:couponCode})
          console.log(coupon);

          const newTotal = amount-amount* parseInt(coupon.discount)/ 100
          console.log(newTotal);
          const Total = Math.round(newTotal)
          console.log(Total);
          
          res.status(200).json({success:true,Total,discount:coupon.discount  })
        } catch (error) {
          console.log(error);
          
        }
       
     },

     checkOutPOST:async(req,res)=>{
 
         
     },


 }


