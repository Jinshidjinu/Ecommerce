
const adminschema=require('../models/adminlog')
const customer=require('../models/customer')
const bcrypt = require('bcrypt')
require('dotenv').config()
Adminkey=process.env.ADMINKEY
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
module.exports={



    adminloginGET:(req,res)=>{
        res.render('adminlogin')
    },
    adminloginPOST:async(req,res)=>{
        try{
            const checking= await adminschema.findOne(({email:req.body.email}))
  
            if(!checking){
              res.send("email  not found")
            }else{
               const passwordmatch= await bcrypt.compare(req.body.password,checking.password)
               if(passwordmatch){
                  res.render("dashboard")
               }else{
                  res.send("wrong password")
               }
            }
         }catch{
             res.send("wrong details")
         }
    },






    adminsignupGET:(req,res)=>{
        res.render('AdminSide/adminsignup')
    },
    adminsignupPOST: async (req,res)=>{

        const{name,email,phone,adminkey,password,confirmPassword}=req.body
        console.log(req.body)
        try{
            const datas={
                 name,
                 email,
                 phone,
                 adminkey,
                 password,
                 confirmPassword
            }
            adminsignup = await adminschema.insertMany(datas)

   
            if(!emailRegex.test(email)){
              return res.status(400).send('invalid password')

            }else{
                                 
                   // hash the password using bcrypt
                      
           const saltRounds=10; // number of salt round for bcrypt
          const hashedPassword = await bcrypt.hash(datas.password, saltRounds)
           datas.password = hashedPassword 
             signupData= await adminschema.insertMany(datas)
               console.log(signupData);
            }
            res.redirect('/admin/adminlogin')
        }catch{
            console.log("error signupPOST",err.message);
        }
    },
    



// admin dashboard 

    dashboardGET:(req,res)=>{
        res.render('AdminSide/dashboard')

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
    
    adminuserlistPOST:  (req,res)=>{
          
    } 
    
} 
