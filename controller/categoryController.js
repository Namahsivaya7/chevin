import slugify from "slugify"
import CategoryModel from "../models/CategoryModel.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

export const createCategoryController=async(req,res)=>{
  try{
      const {name}=req.body
      if(!name){
        return res.status(401).send({message:'name is requires'})
      }
      const existingCategory=await CategoryModel.findOne({name})
      if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'category already exists'
        })

      }
      const category =await new CategoryModel({name,slug:slugify(name)}).save()
       res.status(201).send({
         success:true,
         message:'new category created',
         category,
       })
  }
  catch(error){
   console.log(error)
   res.status(500).send({
    success:false,
    error,
    message:'error in category'
   })
  }
}


//update category
export const updateCategoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;
      const category=await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
       res.status(200).send({
        success:true,
        message:"category updated successfully",
        category,
       });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while updating category'
        });
    }
};
//get all cate
export const categoryController= async(req,res)=>{
 try{
  const category=await CategoryModel.find({});
  res.status(200).send({
    success:true,
  message:"all categories list",
  category,
  })
  
 }
 catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:"error while getting all categories",
  })
 }
};
//single category
export const singleCategoryController=async(req,res)=>{
  try{
    const category=await CategoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
      success:true,
      message:"get single catehory successfully",
      category,
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"error while getting single category"
    })
  };
  
}
//delete category
export const deleteCategoryController=async(req,res)=>{
  try{
    const {id}=req.params;
  await CategoryModel.findByIdAndDelete(id);
  res.status(200).send({
    success:true,
    message:"successfully deleted category",

  })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"error in deleting category",
    })
  }
}
