
    const express=require('express')
    const router=express.Router()
    const dotenv = require('dotenv').config()
    const adminController=require('../controller/adminController')
    const productController=require('../controller/productController')
    const categoryController=require('../controller/CategoryController')
    const bannerController =require('../controller/BannerController')
    const couponController = require('../controller/CouponController')
    const utility = require('../utility/multer')
    const userController = require('../controller/userController')
    const chartController = require('../controller/chartController')
    const nocache = require('nocache')

         // Middleware to set Cache-Control headers

  const setNoCache = (req, res, next) => {  
    res.setHeader('Cache-Control', 'no-store');
    next();
 };
  router.use(setNoCache);
    
    const uploadProducts = utility.productimg()
    const uploadBanner  = utility.bannerimg()




    router.get('/adminlogin',adminController.adminloginGET)
    router.post('/adminlogin',adminController.adminloginPOST)

 // Middleware function to check admin authentication

   const checkAdminAuth = (req, res, next) => {
    // Check if admin email exists in session
    if (req.session.email === process.env.AdminMail) {
        // Admin authenticated, proceed to the next middleware/route handler
        next();
    } else {
        // Admin not authenticated, redirect to admin login page or handle unauthorized access
        res.redirect('/admin/adminlogin');
    }
};

// Apply the middleware for admin authentication to all routes under '/admin'
    router.use(checkAdminAuth);
    




    //admin Logout

    router.get('/AdminLogout',adminController.adminLogoutGET)

    // dashboard  
    router.get('/dashboard',adminController.dashboardGET)
    // router.post('/dashboard',adminController.dashboardPOST)

    //users List
    router.get('/Userslist',nocache(),adminController.adminuserlistGET)
    router.patch('/blockusers',adminController.blockUsersPATCH)
   

    //category

    router.get('/Category',nocache(),categoryController.categoryGET)
    router.post('/Category',categoryController.AddcategoryPOST)
    router.delete('/deleteCategory',categoryController.deleteCategoryDELETE)
    router.delete('/deleteSubCategory',categoryController.deletesubCategoryDELETE)


    // product

    router.get('/products',productController.productsGET)
    router.get('/AddProducts',productController.AddproductsGET)
    router.post('/AddProducts',uploadProducts.array('productImage',20),productController.AddproductsPOST)
    router.get('/editproduct/:productID',productController.editproductGET)
    router.post('/editProduct/:id',uploadProducts.array('productImage',20),productController.editproductPOST)
    router.patch('/blockproducts',productController.blockproductsPATCH)
    router.post('/deleteProduct',productController.deleteProductPOST)

    //banners

   router.get('/banner',bannerController.bannersideGET)
   router.get('/addbanner',bannerController.AddbannerGET)
   router.post('/addbanner',uploadBanner.single('image'),bannerController.AddbannerPOST)
   router.get('/editbanner/:bannerID',bannerController.editbannerGET)
   router.post('/editbanner/:bannerID',uploadBanner.single('image'),bannerController.editbannerPOST)
   router.get('/delete/:deleteID',bannerController.bannerDeleteGET)

   //Coupons

   router.get('/coupon',couponController.couponSideGET)
   router.get('/addcoupon',couponController.AddcouponGET)
   router.post('/addcoupon',couponController.AddcouponPOST)
   router.get('/editcoupon/:CouponID',couponController.editCouponGET)
   router.post('/editcoupon/:CouponID',couponController.editCouponPOST)
   router.delete('/deleteCoupon',couponController.couponDELETE)

   // Order Listing

   router.get('/orderlist',productController.adminOrderListGET)
   router.post('/updateStatus',productController.statusUpdatePOST)

  //chart in dashboard

  router.get('/chart',chartController.chartGET)



 module.exports=router