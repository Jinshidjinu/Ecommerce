

 const CategorySchema = require('../models/category');
const productModel = require('../models/products');
const productController = require('./productController');
module.exports = {

    categoryGET:async(req,res)=>{
        try{
            const CategoryData= await CategorySchema.find()
            res.render('AdminSide/categories',{CategoryData})
        }catch(err){
            console.log("error in homeget", err.message);
        }
       

        
    },


    AddcategoryPOST: async (req, res) => {
        const { categoryName, subcategoryName } = req.body;

        try {
            let category = await CategorySchema.findOne({ category: categoryName });

            if (!category) {
                category = new CategorySchema({
                    category: categoryName,
                    subcategory: [subcategoryName]
                });
            } else {
                // If the category exists, push the new subcategory into the array
                category.subcategory.push(subcategoryName);
            }
            await category.save();

            res.redirect('/admin/Category'); // Redirect to the desired page upon successful addition
        } catch (error) {
            console.error('Error while saving category:', error);
            res.status(500).send('Internal server error');
        }
    },

     deletesubCategoryDELETE:async(req,res)=>{
        try{
         const {subcategoryid,categoryid}=req.query
         await CategorySchema.findOneAndUpdate(
            {category:categoryid},
            {$pull:{subcategory:subcategoryid}},
            {new:true}
         )
         res.status(203).json({success:true,message:"subcategory removed list"})
        }catch(error){
            console.log('error in removing sub category',error);
            res.status(400).json({success:false,message:"something  wrong!"})
        }
     },

     
     deleteCategoryDELETE:async(req,res)=>{
          try{
            const categoryid = req.query.id;
            await CategorySchema.deleteOne({_id:categoryid})  
            res.status(200).json({success:true,message:"Category removed list"})          
          }catch(error){
            console.log('error in removing category',error);
            res.status(500).json({success:false,message:"something  wrong!"})
          }
     },
     categoriesGET:async(req,res)=>{
      try {
        
      const category = req.params.category
      console.log(category);
      const categoryDetails = await productModel.find({category:category})
   
      res.render('UserSide/singleProduct',{categoryDetails})
        
      } catch (error) {
        console.log(error);
        
      }
     


     },
     
}  