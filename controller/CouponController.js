
const couponSchema = require('../models/Coupons')


module.exports={

    couponSideGET :async(req,res)=>{
    
        const findData = await couponSchema.find()
        res.render('AdminSide/Coupons',{findData})
    },
    AddcouponGET:async(req,res)=>{
 
        res.render('AdminSide/Addcoupons')
    },
    AddcouponPOST:async(req,res)=>{
          try{

              const couponData = req.body
              const data = new couponSchema({
      
                CouponCode:couponData.couponName,
                  discount:couponData.couponDiscount,
                  minOrderAmount:couponData.minOrderAmount,
                  maxOrderAmount:couponData.maxOrderAmount,
                  startdate:couponData.startingDate,
                  expiryDate:couponData.endingDate
      
              })
              console.log(data);
              await data.save()
              res.redirect('/admin/coupon')
          }catch(error){
            console.log(error);
          }
    },

    editCouponGET:async(req,res)=>{

      const editCoupID = req.params.CouponID
        
        findEditdata = await couponSchema.findByIdAndUpdate({_id:editCoupID})
     res.render('AdminSide/editCoupon',{findEditdata})

    },

    editCouponPOST:async(req,res)=>{
        try{
          
             const id = req.params.CouponID
             console.log(id);
             const editedData = req.body
             console.log(editedData);

         const NewEditData = await couponSchema.findByIdAndUpdate({_id:id},
            
            {$set:{
              CouponCode :editedData.couponName,
                discount:editedData.couponDiscount,
                minOrderAmount:editedData.minOrderAmount,
                maxOrderAmount:editedData.maxOrderAmount,
                startdate:editedData.startingDate,
                expiryDate:editedData.endingDate
            }

            })
            res.redirect('/admin/coupon')

        }catch(error){
          console.log(error);
        }

    },
     
    couponDELETE:async(req,res)=>{
        try{
            coupid = req.query.id
          await couponSchema.deleteOne({_id:coupid})
          res.status(200).json({success:true,message:"coupon removing the list" })
        }catch(error){
          console.log("error in removing coupons",error);
          res.status(500).json({success:false,message:"something  wrong!"})
        }
            
    }
    

}