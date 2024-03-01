
const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const cartController = require('../controller/CartController')





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

router.get('/cart',cartController.cartGET)
router.get('/addtocart',cartController.addtocartGET)
router.post('/deleteCart',cartController.deletecartPOST)
router.get('/quantity',cartController.updateQuantity)







module.exports=router













