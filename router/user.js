
const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const cartController = require('../controller/CartController')
const addressController = require('../controller/addressController')





router.get('/',userController.loginGET)
router.post('/',userController.loginPOST)

router.get('/signup',userController.signupGET)
router.post('/signup',userController.signupPOST)

router.get('/otpVerify',userController.otpGET)
router.post('/otpVerify',userController.otpPOST)

router.get('/forgot',userController.forgotGET)
router.post('/forgot',userController.forgotPOST)

router.get('/forgot/otp/:mail',userController.forgotOTPverifyGET)
router.post('/forgot/otp/:mail',userController.forgotOTPverifyPOST)

router.get('/Reset/Passwords/:mail',userController.ResetPasswordGET)
router.post('/Reset/Password/:mail',userController.ResetPasswordPOST)

router.get('/userhome',userController.loadUserHomeGET)
router.get('/productView',userController.productViewGET)

router.get("/userAccount",userController.userProfileGET)
router.post("/userAccount",userController.userProfilePOST)

router.get('/address',addressController.AddressGET)
router.get('/Addaddress',addressController.AddaddresuserGET)
router.post('/Addaddress',addressController.AddaddresuserPOST)
router.get('/editAddress/:id',addressController.EditAddressGET)
router.post('/editAddress/:id',addressController.EditAddressPOST)


router.get('/cart',cartController.cartGET)
router.get('/addtocart',cartController.addtocartGET)
router.post('/deleteCart',cartController.deletecartPOST)
router.post('/quantity',cartController.updateQuantity)









module.exports=router













