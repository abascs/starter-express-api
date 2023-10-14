const mongoose=require('mongoose');
const Joi=require('joi')
const traderSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        minlength:3,
        maxlength:200
    },
    number:{
        type:String,
        require:true,
        trim:true,
        minlength:1,
        maxlength:200
    },
    email:{
        type:String,
        require:true,
        trim:true,
        minlength:3,
        maxlength:200
    }
},{timestamps:true});

//validation of new trader

function validatecreatetrader(obj){
    const schema =Joi.object({
        name:Joi.string().trim().min(3).max(200).required(),
        number:Joi.number().min(3).max(99999999999).required(),
        email:Joi.string().min(3).max(50).required()
      })
      return schema.validate(obj)
}
function validateupdatetrader(obj){
    const schema =Joi.object({
        name:Joi.string().trim().min(3).max(200),
        number:Joi.number().min(3).max(99999999999),
        email:Joi.string().min(3).max(50)
      })
      return schema.validate(obj)
}

const Trader=mongoose.model('trader',traderSchema);
module.exports={
    Trader,validatecreatetrader,validateupdatetrader
}