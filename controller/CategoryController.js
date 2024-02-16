
 
  require('axios')
const categoryModel = require('../models/category')
 const CategorySchema = require('../models/category')
module.exports = {

    categoryGET:async(req,res)=>{
        try{
            const CategoryData= await CategorySchema.find()
            res.render('AdminSide/categories',{CategoryData})
        }catch(err){
            console.log("error in homeget", err.message);
        }
       

        
    },

    
    // AddcategoryPOST:async(req,res)=>{
    //    const {categoryName,subcategoryName} = req.body
    //    const addcategory = await CategorySchema({
    //     category:categoryName,
    //     subcategory:subcategoryName
    //    })   

    //    try {
    //     // Save the new category instance
    //     await addcategory.save();
      
    // } catch (error) {
    //     console.error('Error while saving category:', error);
    //     res.status(500).send('Internal server error');
    // }
  
    // }

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

     deleteCategoryDELETE:async(req,res)=>{
        try{
         const {subcategoryid,categoryid}=req.query
         await categoryModel.findOneAndUpdate(
            {category:categoryid},
            {$pull:{subcategory:subcategoryid}},
            {new:true}
         )
         res.status(203).json({success:true,message:"subcategory removed list"})
        }catch(error){
            console.log('error in removing sub category',error);
            res.status(400).json({success:false,message:"something  wrong!"})
        }
     }
}