
const OrderModel = require('../models/Orders')
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

         deleteProductPOST:async(req,res)=>{
           try {
            const prodid = req.query.id
               const proData = await productModel.deleteOne({_id:prodid})
               res.json({success:true,message:"product removed in list"})

           } catch (error) {
            console.log(error);
            
           }
             
         },


         showAllproductsGET:async(req,res)=>{
           
           let allProducts;

          const Name = req.query.search

          allProducts = await productModel.find()

          res.render('userSide/showAllproducts',{allProducts})
         },
         
         searchProductGET:async(req,res)=>{
          try {
            // const userId = req.session.email._id
            console.log(Name); 
            // const category = await categoryModel.find({})
            const products = await productModel.find(
              {productName:{$regex:Name,$options:"i"},}
              
              ) 

             
              // res.render('UserSide/showAllproduct')
            
          } catch (error) {
            console.log(error);
            
          }

         },


         adminOrderListGET:async(req,res)=>{

          try {
            
            const ordersData = await OrderModel.find({}).sort({createAt:-1}).populate('products.id')
            res.render('AdminSide/OrdersList',{ordersData})
          

          } catch (error) {
            console.log(error);
            
          }




         },

         statusUpdatePOST:async(req,res)=>{
          try {
            const id = req.body.Id;
            const selectOption = req.body.Status;

        
            const orderData = await OrderModel.findOne({ _id: id })
            
            if (!orderData) {
              return res.status(404).json({ success: false, message: "Order not found" });
            }
        
            
        
            if (orderData.Status == 'cancelled') {
              req.body.Status =  'cancelled'
            } 

            const updatedOrder = await OrderModel.findOneAndUpdate({_id: id},{Status:req.body.Status},{new:true});

            console.log(updatedOrder);
        
            if (updatedOrder.modifiedCount == 0) {
              return res.status(400).json({ success: false, message: "Failed to update order status" });
            }
        
            res.json({ success: true, message: "Order status updated successfully" });
          } catch (error) {
            console.log(error);
          
         }


         }



}