
const OrderModel = require('../models/Orders')
const productModel = require('../models/products')
const categoryModel = require('../models/category')
const cartModel = require('../models/Cart')
const AddressModel = require('../models/Address')
const CouponsModel = require('../models/Coupons')
const customerModel = require('../models/customer')
const { default: mongoose } = require('mongoose')
const nodemailer = require('nodemailer')
const myemail = process.env.Hidemyemail;
const Mypassword = process.env.HideMypassword;
const otpConfirm = Math.floor(Math.random() * 900000) + 100000;

 module.exports={

     checkOutGET :async(req,res)=>{
        try{
            let totalPrice;
            const userID = req.session.email?._id
            const addressView = await AddressModel.findOne({user:userID})
            const usersData   = await customerModel.findOne({_id:userID})
           
            const prodid = req.query.id
            req.session.prodid = prodid                         
            let productDatas;
            let mrp = 0
            let discount;
            if(!req.session.prodid){
              const cartData = await cartModel.findOne({userID:userID}).populate("productID.id")
              const cartProduct = await cartModel.findOne({userID:userID})
              productDatas = cartProduct.productID
               totalPrice = cartData.productID.reduce((acc,data)=>{
                 mrp += data.id.price * data.quantity
                return acc += data.id.MRP * data.quantity
              },0)
              discount = mrp 

            }else{
              const productID = req.session.prodid
              productDatas = [{
                id:new mongoose.Types.ObjectId(productData),
                quantity
              }]
              const productData = await productModel.findById(productID)
              totalPrice = productData.price
              mrp = productData.MRP
              
            }
            const couponData = await CouponsModel.findOne({
              minOrderAmount: { $lte: totalPrice }, // Minimum order amount should be greater than or equal to total price
              maxOrderAmount: { $gte: totalPrice }  // Maximum order amount should be less than or equal to total price
            });
            req.session.totalPrice = totalPrice
            req.session.products = productDatas
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
          const newTotal = amount-amount* parseInt(coupon.discount)/ 100
          const Total = Math.round(newTotal)
          req.session.totalPrice = Total

          res.status(200).json({success:true,Total,discount:coupon.discount})
        } catch (error) {
          console.log(error);
          
        }
       
     },

     checkOutPOST:async(req,res)=>{
           
      
          
          const {phone,paymentAddress,paymentMethod} = req.body

          if(paymentMethod == 'COD'){

              req.session.paymentMethod = paymentMethod
              req.session.paymentAddress = paymentAddress
              req.session.totalPrice  
              const userID = req.session.email._id
              const userData = await customerModel.findOne({_id:userID})
              const email = userData.email
              console.log(email);

              try {
                var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: myemail,
                    pass: Mypassword,
                  },
                });
          
                var mailOptions = {
                  from: myemail,
                  to: `${email}`,
                  subject: "Sending Email using Node.js",
                  text: `Your OTP is : ${otpConfirm}`,
                };
          
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                    // res.redirect(`${email}`);
                  }
                });
          
           res.status(200).json({success:true ,COD: true })
          }catch (error) {
            console.log(error);          
          }
          
        } 
  
    
         
     },
     OrderOTPGET:async(req,res)=>{

      res.render('UserSide/OrderOtp')
     },

     OrderOTPpost:async(req,res)=>{
        try{

          let cart = []

          userID = req.session.email._id
          const {otp} = req.body
       
          if(otp == otpConfirm){
            
            const payMethod =  req.session.paymentMethod
            const paymentAddress = req.session.paymentAddress
            const address = paymentAddress.replace(/\s+/g, ' ').trim()
            const totalPrice = req.session.totalPrice
            
            let carts = await cartModel.findOne({userID:userID})
             
            if(req.session.prodid){
                 
              let products = [
                {
                  productID:req.session.prodid,
                  quantity:1
                },
              ]
              cart = products

            }else{
              cart = carts.productID
            }
              const orders = new OrderModel({
              userID:req.session.email._id,
              products:req.session.products,
              totalPrice:totalPrice,
              address: address ,
              paymentMethod:payMethod,

            })
            await orders.save()

            if(!req.session.prodid){
  
             await cartModel.findOne({userID:userID})             

            }
            delete req.session.prodid
            res.redirect('/confirmed')
            

          }

        }catch(error){
          console.log(error);
        }  


     },

     SuccessGET:async(req,res)=>{

      try {
        if (req.session.email._id) {
          res.render("UserSide/OrderSuccess");
        } else {
          res.redirect("/");
        }
      } catch (err) {
        console.log("confirmSuccess", err);
      }

     }

 }


