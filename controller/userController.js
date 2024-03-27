
const bcrypt = require("bcrypt");
const utility = require("../utility/mailer");
const Mail = require("nodemailer/lib/mailer");
const nodemailer = require("nodemailer");
const mailOTP = require("../middlewar/otp");
require("dotenv").config();
const myemail = process.env.Hidemyemail;
const Mypassword = process.env.HideMypassword;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const serviceSID = "VA7ceb77314a04c2907c0c93293c54abf4";
const AccountSID = process.env.AccountSID;
const AuthToken = process.env.AuthToken;
const client = require("twilio")(AccountSID, AuthToken);

const customer = require("../models/customer");
const products = require('../models/products')
const bannerSchema = require('../models/Banner')
const categorySchema = require('../models/category')
const wishlistSchema = require('../models/wishlist')
const AddressSchema  = require('../models/Address')
const ReviewModel =require('../models/Review') 

let Number;

module.exports = {
  // user login

  loginGET: (req, res) => {
    res.render("UserSide/userlogin");
  },

  loginPOST: async (req, res) => {
    try {
      const check = await customer.findOne({ email: req.body.email });

      if (!check) {
        res.send("email  not found");
      } else {
        const passwordmatch = await bcrypt.compare(
          req.body.password,
          check.password
        );
        if (passwordmatch) {
           req.session.email = check
          res.redirect("/userhome");
        } else {
          res.send("wrong password");
        }
      }
    } catch {
      res.send("wrong details");
    }
  },

  // user signup

  signupGET: (req, res) => {
    res.render("UserSide/signup");
  },

  signupPOST: async (req, res) => {
    const { name, password, phone, email, confirmPassword } = req.body;
    try {
      const data = {
        name,
        password,
        phone,
        email,
        confirmPassword,
      };

      //    check if the email already exists in the database
      const existingUser = await customer.findOne({ email: data.email });
      if (existingUser) {
        return res.send("email already exists.please use different email");
      }

      if (!emailRegex.test(email)) {
        return res.render("UserSide/signup", { error: "invalid email format" });
      }

      if (!passwordRegex.test(password)) {
        return res.render("UserSide/signup", { error: "invalid password" });
        // return res.send('invalid password' )
      }

      if (password !== confirmPassword) {
        return res.render("UserSide/signup", { error: "password mismatch" });
        // return res.send('not match')
      } else {
        // hash the password using bcrypt
        const saltRounds = 10; // number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // replace the hashpassword with the original password
        signupData = await customer.insertMany(data);
      
        // otp sms  signup;
        Number = req.body.phone;
        await client.verify.v2
          .services(serviceSID)
          .verifications.create({
            to: `+91${Number}`,
            channel: "sms",
          })

          .then((resp) => {
            res.redirect("/otpVerify");
          });
      }
    } catch (err) {
      console.log("error signupPOST", err.message);
    }
  },

  //otp verify Sighnup

  otpGET: (req, res) => {
    res.render("UserSide/verifyOTP");
  },

  otpPOST: async (req, res) => {
    const { otp } = req.body;
    const verificationCheck = await client.verify.v2
      .services(serviceSID)
      .verificationChecks.create({
        to: `+91${Number}`,
        code: otp,
      });

    // Successful verification
    if (verificationCheck.status === "approved") {
      const verifyTrue = await customer.updateOne(
        { phone: Number },
        { $set: { verified: true } }
      );
      res.status(200).redirect("/");
    } else {
      // Verification failed
      res
        .status(400)
        .json({
          message: "OTP verification failed",
          error: verificationCheck.status,
        });
    }
  },

  // forgotpassword

  forgotGET: async (req, res) => {
    res.render("UserSide/forgotpassword");
  },
  forgotPOST: async (req, res) => {
    const { email } = req.body;
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
        text: `Your OTP is : ${mailOTP.sendOTP}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.redirect(`/forgot/otp/${email}`);
        }
      });
    } catch (err) {
      console.log("error occured while receiving the OTP");
    }
  },

  //forgotOTPverifcation

  forgotOTPverifyGET: async (req, res) => {
    const email = req.params.mail;
    res.render("UserSide/forgotSendOTP", { email });
  },

  forgotOTPverifyPOST: async (req, res) => {
    const email = req.params.mail;
    const otp = req.body.otp;
    const userExist = await customer.findOne({ email: email });

    if (!userExist) {     
      res.redirect("/");
    } else if (mailOTP.sendOTP == otp) {
      res.redirect(`/Reset/Passwords/${email}`);
    }
  },

  // ResetPassword

  ResetPasswordGET: (req, res) => {
 
    const email = req.params.mail;
    res.render("UserSide/ResetPassword", { email });
  },
  ResetPasswordPOST: async (req, res) => {
    try {
      const email = req.params.mail;
      const newPassword = req.body.newPassword;
      const confirmPassword = req.body.confirmPassword;
      if (newPassword !== confirmPassword) {
        // return res.render('ResetPassword',{email,error:"password do not match "})
        res.send("password not match");
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await customer.updateOne(
          { email: email },
          { $set: { password: hashedPassword } }
        );

        res.redirect("/");
      }
    } catch (error) {
      console.log("error not change in password");
    }
  },


  //UserHome

  loadUserHomeGET :async(req,res)=>{
  
      const categoryData = await categorySchema.find() 
      const bannerData = await bannerSchema.find()
      const productData = await products.find({is_blocked:false}).limit(4)  
      res.render('UserSide/userHome',{bannerData,productData,categoryData})
    },


    productViewGET:async(req,res)=>{
      try{
        const userID = req.session.email?._id
        const viewID = req.query.id
        let existingProduct = false;
        const productShow = await products.findOne({_id:viewID})
        const wishlist  = await wishlistSchema.findOne({userID:userID})
        const ProductReview = await ReviewModel.findOne({productID:viewID}).populate('review.UserId')
      
     if (wishlist && wishlist.product) {
     const existProduct = wishlist.product.find(product => product.id.equals(viewID));
     if (existProduct !== undefined) {
      existingProduct = true; 
    }
      }
        res.render('UserSide/productDetails',{productShow,existingProduct,ProductReview})
      }catch(error){
        console.log(error);
      }
    },

   
    userProfileGET : async(req,res)=>{
       try{
        const userID = req.session.email._id
        const findAccount = await customer.findOne({_id:userID})
        const addressdetails =  await AddressSchema.findOne({user:userID})
        res.render('UserSide/Userprofile',{findAccount,addressdetails})

       }catch(error){
       console.log(error);
       }


    },
    editProfileGET : async(req,res)=>{
       try {
        const userID = req.session.email._id
        const findAccount = await customer.findOne({_id:userID})
        res.render('userSide/userEdit',{findAccount})
       } catch (error) {
        console.log(error);
       }
    

    },
    editProfilePOST: async (req, res) => {
      try {
        const userID = req.session.email._id;
        const findAccount = await customer.findOne({ _id: userID });
        const { fName, email, phone, oldPass, password, cPass } = req.body;
    
        let hashedPassword = findAccount.password; // Initialize with existing password
    
        // Check if password is provided for update
        if (password !== "") {
          const salt = await bcrypt.genSalt(10);
          hashedPassword = await bcrypt.hash(password, salt);
        }
    
        // Update user data
        await customer.updateOne(
          { _id: findAccount._id },
          {
            $set: {
              fullName: fName,
              phoneNumber: phone,
              email: email,
              password: hashedPassword,
            },
          }
        );
    
        // Redirect to user account page after successful update
        res.status(200).redirect("/userAccount");
      } catch (error) {
        console.error("Error occurred during profile update:", error);
        res.status(500).send("Internal Server Error");
      }
    },

    logoutGET:async(req,res)=>{

      try {
        req.session.destroy((err)=>{
          if(err){
            console.error("Error destroying session ",err)
          }else{
            console.log("session destroy ")
            res.redirect('/')
          }
        })
      } catch (error) {
        console.log('logout error',error);
        
      }

    }



};



