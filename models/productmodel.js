const Joi = require('joi');
const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,
        minlength:3,
        maxlength:200
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:250
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200
    },
    trader:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'trader'
    }
},{timestamps:true});

function validatecreateproduct(obj){
    const schema =Joi.object({
        title:Joi.string().trim().min(3).max(200).required(),
        description:Joi.string().min(3).max(250).required(),
        price:Joi.number().required(),
        trader:Joi.required()
      })
      return schema.validate(obj)
}
function validateupdateproduct(obj){
    const schema =Joi.object({
        title:Joi.string().trim().min(3).max(200),
        description:Joi.string().min(3).max(200),
        price:Joi.number(),
        trader:Joi.string()
      })
      return schema.validate(obj)
}

const product=mongoose.model('products',productSchema);
module.exports={
    product,
    validatecreateproduct,
    validateupdateproduct
}