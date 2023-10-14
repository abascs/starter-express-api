const asyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {User,validateRegisterUser,validateloginUser}=require('../models/usemodel.js')


//register new user
const registerNewUser=asyncHandler(
    async(req,res)=>{
        const {error}=validateRegisterUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        let user =await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({message:'this user already regiserd'})
        }
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
        user=new User({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
        });

        const result=await user.save();
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRECTKEY,{
            expiresIn:"4d"
        });
        console.log('requised done')
        const {password,...other}=result._doc
        res.status(201).json({other,token})
    }
)
//login user
const loginUser=asyncHandler(
    async(req,res)=>{
        const {error}=validateloginUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        let user =await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({message:'invalid email or password'})
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:'invalid email or password'})
        }
        

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRECTKEY,{
            expiresIn:"4d"
        })
        const {password,...other}=user._doc
        res.status(201).json({other,token})
    }
)

module.exports={
    registerNewUser,
    loginUser
}