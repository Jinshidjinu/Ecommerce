
const categoryModel= require('../models/category')
const productModel = require('../models/products')
const wishlistModel= require('../models/wishlist')


module.exports={
    
    productsGET:async(req,res)=>{
      try{
        const productdatas = await productModel.find()
          res.render('AdminSide/products',{productdatas})
      }catch(error){
        console.error('Error:', error);
      }
      
    },

    AddproductsGET:async(req,res)=>{
      try{
         const categorydatas = await categoryModel.find()
          res.render('AdminSide/addproduct',{categorydatas})
      }catch{
        console.error('Error:', error);
      }

    },

    AddproductsPOST:async(req,res)=>{
        try{
            if(!req.files ||req.files.length>5){
                return res.status(230).json({message:"please provide a image",success:false})
            }
            const productImage = req.files.map(file=>file.filename)
                    const { productName, prices, discount, stock, category, subCategory, deliveryDate, description, color, size } = req.body;
                    const newschema = new productModel({
                        productName,    
                        prices,
                        discount,
                        stock,
                        category,
                        subCategory,
                        deliveryDate,
                        description,
                        size,
                        color,
                        image:productImage,
                    });
                    await newschema.save()
                   res.redirect('/admin/products')
                } catch (error) {
                    console.error("Error saving data to the database:", error);
                    res.status(500).json({ message: "Internal Server Error", success: false });
                }
                
        },


        editproductGET:async (req,res)=>{
            let proid = req.params.productID
            let getproducts = await  productModel.findByIdAndUpdate({_id:proid})
            let categorydata = await categoryModel.find()
            res.render('AdminSide/editProduct',{getproducts,categorydata})
        },
                   
        editproductPOST: async (req,res)=>{
            try{
              const prodid = req.params.id
              const editProductData = req.body;
              const productImage = req.files.map(file=>file.filename) 
              const updateproducts = await productModel.findByIdAndUpdate({_id:prodid},
                {$set:{
                      
                  productName:editProductData.productName,
                  stock :editProductData.stock,
                  prices:editProductData.prices,
                  category:editProductData.category,
                  deliveryDate:editProductData.deliveryDate,
                  image:productImage

                }
              })
              res.redirect('/admin/products')
            }catch(error){
              console.log(error);
            }
        },
             

         blockproductsPATCH: async (req,res)=>{
          let block = false;
           try{
                 const dataID = req.query.id
                 const userdetail = await productModel.findOne({_id:dataID})
                 if(userdetail.is_blocked){
                  await productModel.updateOne({_id:dataID},{$set:{is_blocked:false}})
                  block = false
                 }else{
                  await productModel.updateOne({_id:dataID},{$set:{is_blocked:true}})
                  block = true
                 }
                 res.json({ block});    
           }catch(error){
                console.log(error.message);
           }  
         },


         showAllproductsGET:async(req,res)=>{
          const userID = req.session.email?._id
          const productDetails = await productModel.find()
          res.render('userSide/showAllproducts',{productDetails})
         }



}