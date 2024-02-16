
    const express=require('express')
    const router=express.Router()
    const adminController=require('../controller/adminController')
    const productController=require('../controller/productController')
    const categoryController=require('../controller/CategoryController')


    router.get('/adminlogin',adminController.adminloginGET)
    router.post('/adminlogin',adminController.adminloginPOST)

    router.get('/signup',adminController.adminsignupGET)
    router.post('/signup',adminController.adminsignupPOST)
    
    router.get('/dashboard',adminController.dashboardGET)
    router.post('/dashboard',adminController.dashboardPOST)

    router.get('/Userslist',adminController.adminuserlistGET)
    router.post('/Userslist',adminController.adminuserlistPOST)

    router.get('/Category',categoryController.categoryGET)
    router.post('/Category',categoryController.AddcategoryPOST)

    router.delete('/deleteCategory',categoryController.deleteCategoryDELETE)






    module.exports=router