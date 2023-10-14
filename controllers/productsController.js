const {product,validatecreateproduct,validateupdateproduct}=require('../models/productmodel')
const asyncHandler=require('express-async-handler')

//get all products
const getAllProdutcs=asyncHandler(
    async(req,res)=>{
      const Product=await product.find().populate('trader');
      res.status(200).json(Product)
    }
  )
//get product by id
const getProductById=asyncHandler(
    async(req,res)=>{
      const Product=await product.findById(req.params.id).populate('trader')
      if(product){
        res.status(200).json(Product)
      }else{
        res.status(404).json({message:'is not found'})
      }
    }
  )
//post new product
const addNewProduct=asyncHandler(
    async(req,res)=>{
      const {error}=validatecreateproduct(req.body)
      if(error){
        return res.status(404).json({message: error.details[0].message});
      }
      const Product=new product(
        {
          title:req.body.title,
          description:req.body.description,
          price:req.body.price,
          trader:req.body.trader
        }
      )
      const result=await Product.save()
      res.status(201).json(result);
    }
  )
//update product
const updateProduct=asyncHandler(
    async(req,res)=>{
      const {error}=validateupdateproduct(req.body);
      if(error){
          res.status(400).json({message:error.details[0].message})
      }
      const Product=await product.findByIdAndUpdate(req.params.id,{
        $set:{
          title:req.body.title,
          description:req.body.description,
          price:req.body.price,
          trader:req.body.trader
        }
      },{new:true})
      if(Product){
          res.status(200).json({message:'product is updated'})
      }else{
          res.status(404).json({message:'products is not found'})
      }
  }
  )
//delete product
const deleteProducts=asyncHandler(
    async(req,res)=>{
      const Product= await product.findByIdAndDelete(req.params.id)
      if(Product){
          res.status(200).json({message:'product is deleted'})
      }else{
          res.status(404).json({message:'products is not found'})
      }
  }
  )

module.exports={
    getAllProdutcs,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProducts
}