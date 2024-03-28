
const bannerSchema = require('../models/Banner')



module.exports={

    bannersideGET :async(req,res)=>{
     
        const BannerDatas = await bannerSchema.find()
        res.render('AdminSide/banner',{BannerDatas})
    },

    AddbannerGET:async(req,res)=>{
        res.render('AdminSide/Addbanner')
    },

    AddbannerPOST:async(req,res)=>{
        const productImage = req.file.filename
        const datas=req.body
        console.log(datas); 

        const Newbanner = new bannerSchema({
            title:datas.bannerName,
            description:datas.bannerHeading,
            offer:datas.offerPrice,
            startdate:datas.startDate,
            expirydate:datas.endDate,
            Image:productImage
        })

        await Newbanner.save()
        res.redirect('/admin/banner')
    },

    editbannerGET:async(req,res)=>{
        const bannerid = req.params.bannerID
        const getbannerid = await bannerSchema.findById({_id:bannerid})
        res.render('AdminSide/editbanner',{getbannerid})
    },
    editbannerPOST:async(req,res)=>{
        try{

            const id = req.params.bannerID
            const datas =await bannerSchema.findById(id)
            const bodyData = req.body
            const editIMG = req?.file?.filename
            const image = datas.Image
            if (!editIMG) {
                
                await bannerSchema.updateOne({_id:datas},{$set:
                    {   title:bodyData.bannerName,
                        description:bodyData.bannerHeading,
                        offer:bodyData.offerPrice,
                        startdate:bodyData.startDates,
                        expirydate:bodyData.endDate,
                        Image:image}})
            }else{
                await bannerSchema.updateOne({_id:datas},{$set:
                    {
                    title:bodyData.bannerName,
                    description:bodyData.bannerHeading,
                    offer:bodyData.offerPrice,
                    startdate:bodyData.startDates,
                    expirydate:bodyData.endDate,
                    Image:editIMG
                }})
            }
            res.redirect('/admin/banner')

        }catch(error){
            console.log(error);
        }
        
        
    },
    bannerDeleteGET:async(req,res)=>{
      try{
          const deleteid = req.params.deleteID
          console.log(deleteid);

          await bannerSchema.deleteOne({_id:deleteid})

          res.redirect("/admin/banner")
      }catch(error){
        console.log(error);
      }

    }


}