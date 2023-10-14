const bcrypt=require('bcryptjs')
const {User,validateUpdateUser}=require('../models/usemodel.js')
const asyncHandler=require('express-async-handler')


//update user
const updateUser=asyncHandler(
    async(req,res)=>{
        const {error}=validateUpdateUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        const updateduser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                email:req.body.email,
                password:req.body.password,
                username:req.body.username,
            }
        },{new:true}).select('-password')
        res.status(200).json(updateduser)
    }
)
//get all users for only admin
const getUsersForAdmin=asyncHandler(
    async(req,res)=>{
        const users=await User.find().select('-password');
        res.status(200).json(users)
    }
)
//get user by id for only admin and user himself
const getUserById=asyncHandler(
    async(req,res)=>{
        const user=await User.findById(req.params.id).select('-password');
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"user not found"})
        }
    }
)
//delet user
const deleteUser=asyncHandler(
    async(req,res)=>{
        const user=await User.findById(req.params.id).select('-password');
        if(user){
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"delete done scessfully"})
        }else{
            res.status(404).json({message:"user not found"})
        }
    }
)

module.exports={
    updateUser,
    getUsersForAdmin,
    getUserById,
    deleteUser
}