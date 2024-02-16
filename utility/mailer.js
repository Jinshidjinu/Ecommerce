
// const nodemailer = require('nodemailer');
// const users = require('../controller/userController')
// // const smtp=require('nodemailer-smtp-transport')

// exports.sendotpverification=async (email,otp)=>{

//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.myemail,
//             pass: process.env.Mypassword
//         }
//     });
    
//     ;
//       var mailOptions = {
//         from: process.env.myemail,
//         to: email,
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// }

// exports.generateOTP =()=>{
//   return `${Math.floor(1000 + Math.random()*9000)}`
//  }

  



