const { default: mongoose, Types } = require('mongoose')
const addressSchema = require('../models/Address')
const userschema = require('../models/customer')

module.exports={

 AddressGET:async(req,res)=>{
  if(req.session.email){
    try{
     const userID = req.session.email._id
      const addressView = await addressSchema.findOne({user:userID})
         res.render('UserSide/Address',{addressView})
 
    }catch(error){
       console.log(error);
    }
  }else{
    res.redirect('/')
  }
 },

 AddaddresuserGET:async(req,res)=>{

    res.render('UserSide/Addaddress')
 },
 AddaddresuserPOST : async (req, res) => {
  if (req.session.email) {
      
      try {
        const userID = new mongoose.Types.ObjectId(req.session.email._id); // Convert the userID to ObjectId
        console.log(userID);
        
        const datas = {
          Locality: req.body.locality,
          country: req.body.country,
          District: req.body.district,
          state: req.body.state,
          City: req.body.city,
          HouseName:req.body.housename,
          HouseNo: req.body.hNo,
          pincode: req.body.pin,
        };
        // Update the address
        const updatedAddresss = await addressSchema.findOneAndUpdate(
          { user: userID },
          { $push: { address: datas } },
          { upsert: true, new: true }
        );
        console.log(updatedAddresss);
        res.json({ add: true, address: updatedAddresss });
      } catch (err) {
        console.error(err);
        res.status(500).json({ add: false, error: err.message });
      }
  }
},
}
}