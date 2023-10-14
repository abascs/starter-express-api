const mongoose=require('mongoose');
const Joi=require('joi');

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
}, {timestamps:true})
//validate

function validateRegisterUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        username:Joi.string().trim().min(2).max(100).required(),
        password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}
function validateloginUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}
function validateUpdateUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        username:Joi.string().trim().min(2).max(100),
        password:Joi.string().trim().min(6),
    })
    return schema.validate(obj)
}
const User=mongoose.model('User',userSchema);
module.exports={User,validateRegisterUser,validateloginUser,validateUpdateUser}