
const OrderModel = require('../models/Orders')
const productModel = require('../models/products')
const categoryModel = require('../models/category')
const cartModel = require('../models/Cart')
const AddressModel = require('../models/Address')
const CoupunsModel = require('../models/Coupons')
const customerModel = require('../models/customer')

 module.exports={

     checkOutGET :async(req,res)=>{
        try{
            const userID = req.session.email?._id
            const addressView = await AddressModel.findOne({user:userID})
            const usersData   = await customerModel.findOne({_id:userID})
            const prodid = req.query.id
            req.session.prodid = prodid                         
            let totalPrice;
            let mrp = 0
            let discount;
            if(!req.session.prodid){
              const cartData = await cartModel.findOne({userID:userID}).populate("productID.id")
               totalPrice = cartData.productID.reduce((acc,data)=>{
                 mrp += data.id.MRP * data.quantity
                return acc += data.id.price * data.quantity
              },0)
              discount = mrp-totalPrice 
              console.log('dis',discount)
              console.log('mrp',mrp);
              console.log('total',totalPrice)
            }else{
              const productID = req.session.prodid
              const productData = await productModel.findById(productID)
              totalPrice = productData.price
              mrp = productData.MRP
              discount = productData.MRP - totalPrice


            }
            res.render('UserSide/checkout',{addressView,usersData,totalPrice,discount,mrp})

        }catch(error){
        console.log(error)
        }
        
     },

     checkOutPOST:async(req,res)=>{

      
     },

     
 }


