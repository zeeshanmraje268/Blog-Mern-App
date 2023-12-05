const User=require('../model/userModel');
const bcrypt=require('bcrypt')

const registerController=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password ){
            res.status(400).json({error:"Please Fill All Fields"})
        }
        const hashPassword=await bcrypt.hash(password,10);
        const newUser=new User({name,email,password:hashPassword});
        await newUser.save();
        res.status(201).json({newUser});
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json({messege:"Please provide email or password !"})
        }
        
        const user= await User.findOne({email});
        if(!user){
            res.status(400).json({error:'User Not Found !'})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({error:"Invalid email or password !"})
        }
        else{
            res.status(200).json({messege:"Successfully Login",user})
        }
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getAllUsers=async(req,res)=>{
    try{
        const user=await User.find({});
        res.status(200).json({user});
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={getAllUsers,loginController,registerController}