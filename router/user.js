
const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const cartController = require('../controller/CartController')
const addressController = require('../controller/addressController')
const wishlistController = require('../controller/wishlistController')
const productController=require('../controller/productController')
const paymentController = require('../controller/paymentController')




//...........users Login Details...........//
router.get('/',userController.loginGET)
router.post('/',userController.loginPOST)

//...........users Sighnup Details ...........//
router.get('/signup',userController.signupGET)
router.post('/signup',userController.signupPOST)

//...........OTP  Details ...........//
router.get('/otpVerify',userController.otpGET)
router.post('/otpVerify',userController.otpPOST)

//...........Forgot Details ...........//
router.get('/forgot',userController.forgotGET)
router.post('/forgot',userController.forgotPOST)
router.get('/forgot/otp/:mail',userController.forgotOTPverifyGET)
router.post('/forgot/otp/:mail',userController.forgotOTPverifyPOST)

//...........Reset password Details ...........//
router.get('/Reset/Passwords/:mail',userController.ResetPasswordGET)
router.post('/Reset/Password/:mail',userController.ResetPasswordPOST)

// users Homepage
router.get('/userhome',userController.loadUserHomeGET)
router.get('/productView',userController.productViewGET)


// show all products
router.get('/showAllproducts',productController.showAllproductsGET)

// users Account 
router.get("/userAccount",userController.userProfileGET)
router.get("/editAccount",userController.editProfileGET)


// users Address details
router.get('/address',addressController.AddressGET)
router.get('/Addaddress',addressController.AddaddresuserGET)
router.post('/Addaddress',addressController.AddaddresuserPOST)
router.get('/editAddress/:id',addressController.EditAddressGET)
router.post('/editAddress/:id',addressController.EditAddressPOST)
router.delete('/addressdelete',addressController.addressDelete)

//...........Cart Details ...........//
router.get('/cart',cartController.cartGET)
router.get('/addtocart',cartController.addtocartGET)
router.post('/deleteCart',cartController.deletecartPOST)
router.post('/quantity',cartController.updateQuantity)

//...........wishlist Details ...........//
router.get('/wishlist',wishlistController.wishlistGET)
router.get('/addwishlist',wishlistController.addwishlistGET)
router.post('/deletewishlist',wishlistController.wishlistPOST)

//..........Payment details .............//
router.get('/usersCheckout',paymentController.checkOutGET)
router.post('/userCheckout',paymentController.checkOutPOST)
router.post('/applyCoupon',paymentController.ApplyCouponPOST)










module.exports=router













