const Blog =require('../model/blogModel');
const User=require('../model/userModel');
const mongoose=require('mongoose');

const createBlogController=async(req,res)=>{
  try{
      const {title,description,image,userId}=req.body;
      if(!title || !description || !image || !userId){
        res.status(400).json({error:"Please Fill All Fields !"})
      }
      const existingUser=await User.findById(userId);
      if(!existingUser){
        res.status(400).json({error:"User is not registerd"})
      }
     const newBlog=new Blog({title,description,image,userId});
     const session=await mongoose.startSession();
     session.startTransaction();
     await newBlog.save({session});
     existingUser.blogs.push(newBlog)
     await existingUser.save({session});
     await session.commitTransaction();
     await newBlog.save();
     res.status(201).json({success:"New Blog is created !",newBlog})

  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}



const getAllBlogController=async(req,res)=>{
  try{
      const blog= await Blog.find({}).populate('userId');
      if(!blog){
        res.status(400).json({error:"Something went wrong"})
      }
      else{
        res.status(200).json({success:"List of All Blogs",LengthOfAllBlogs:blog.length,blog})
        
      }
  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}


const getBlogByIdController=async(req,res)=>{
  try{
      const {id}=req.params;
      const blog=await Blog.findById(id);
      if(!blog){
        res.status(400).json({error:"There is no Blog By Such Id"})
      }
      else{
        res.status(200).json({messege:"The Blog You were looking is : ",blog})
      }
  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}

const updateBlogController=async(req,res)=>{
  try{
     const {id}=req.params;
     const {title,description,image}=req.body;
     const newBlog=await Blog.findByIdAndUpdate(id,{...req.body},{new:true})
    if(!newBlog){
      res.status(400).json({error:"There is no Such Blog !"})
    }
    else{
      res.status(200).json({success:"Blog is Updated",newBlog})
    }
    
  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}

const deleteBlogController=async(req,res)=>{
  try{
      const {id}=req.params;
      const blog=await Blog.findByIdAndDelete(id);
      if(!blog){
        res.status(400).json({error:"There is no Blog By Such Id"})
      }
      else{
        res.status(200).json({messege:"Blog is deleted !"})
      }  
  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}

const getUserBlogController=async(req,res)=>{
  try{
      const {id}=req.params;
      const user=await User.findById(id).populate('blogs');
      if(!user){
        res.status(400).json({error:"There is no User as such"})
      }
      else{
        res.status(200).json({user})
      }
  }catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}

module.exports={getAllBlogController,createBlogController,getBlogByIdController,updateBlogController,deleteBlogController,getUserBlogController}