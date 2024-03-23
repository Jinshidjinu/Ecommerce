
const adminschema=require('../models/adminlog')
const customer=require('../models/customer')
const userModel = require('../models/customer')
const OrderModel = require('../models/Orders')
const bcrypt = require('bcrypt')
const productModel = require('../models/products')
const dotenv = require('dotenv').config()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Admin = {
    email :process.env.AdminMail,
    password : process.env.Password
}

module.exports={


    adminloginGET:async(req,res)=>{

    
        res.render('AdminSide/adminlogin')
    },
    adminloginPOST:async(req,res)=>{

        const Users = await customer.find()
        const Orders = await OrderModel.find()
        
       if(Admin.email == req.body.email && Admin.password == req.body.password){
           res.render('AdminSide/dashboard',{Users,Orders})

       }
    },

   
    
// admin dashboard 

    dashboardGET:async(req,res)=>{
        try {
            
      
       const Users = await userModel.find();
       const Orders = await OrderModel.find()
       const products = await productModel.find()
       res.render('AdminSide/dashboard',{Users,Orders,products})

        } catch (error) {
            console.log(error);
            
        }

    },
    dashboardPOST:(req,res)=>{
    
    },

    // admin usersList showpage

    adminuserlistGET: async (req, res) => {
        try {
            const Usersdatas = await customer.find();
            res.render("AdminSide/AdminUserslist", { Usersdatas });
        }
        catch (err) {
            console.log("error in homeget", err.message);
        }
    },
   
    blockUsersPATCH: async (req,res)=>{
        console.log('hai');
  
        let block = false;

         try{
               const dataID = req.query.id
               console.log(dataID);

               const userdetail = await customer.findOne({_id:dataID})

               if(userdetail.verified){
                await customer.updateOne({_id:dataID},{$set:{verified:false}})
                block = false
               }else{
                await customer.updateOne({_id:dataID},{$set:{verified:true}})
                block = true
               }
               res.json({ block});   
              
         }catch(error){
              console.log(error.message);
         }  
        
       }
} 
