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
      
        res.json({ add: true, address: updatedAddresss });
      } catch (err) {
        console.error(err);
        res.status(500).json({ add: false, error: err.message });
      }
  }
},
EditAddressGET: async (req, res) => {
const addressid = req.params.id
console.log(addressid);
  const userId = req.session.email._id
  try {
    const addressView = await addressSchema.findOne({user:userId});
    res.render('UserSide/editAddress', { addressView });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
},

EditAddressPOST : async (req, res) => {
  try {
      const userID = req.session.email?._id;
      const newAddress = req.body;
      const addressID = req.params.id;

      const editAddress = await addressSchema.updateOne(
        // Query: Update the document where the user is the userID and the address has the given ID
        {user:userID,'address._id':addressID},
       // Update: Set the fields of the address matching the given ID
        {

          $set:{
            'address.$.Locality':newAddress.locality,
            'address.$.country' :newAddress.country,
            'address.$.District':newAddress.district,
            'address.$.state':newAddress.state,
            'address.$.City' :newAddress.city,
            'address.$.HouseName':newAddress.housename,
            'address.$.HouseNo':newAddress.hNo,
            'address.$.pincode':newAddress.pincode
          }
        }

      );
      console.log(editAddress);
      res.redirect('/address')

  } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
  }
},

addressDelete:async(req,res)=>{

  try{
    
    const addrID = req.query.id
    console.log(addrID);

    const userID = req.session.email._id
    console.log(userID);

    const result = await addressSchema.updateOne(
      {user:userID},
      {$pull:{address:{_id:addrID}}}
    )

    res.json({success:true})


  }catch(error){
    console.log(error)
    res.status(500).json({ success: false, error: "Server Error" });

  }


}
}