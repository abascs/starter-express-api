const {Trader,validatecreatetrader,validateupdatetrader}=require('../models/tradermodel')
const asyncHandler=require('express-async-handler')


//get all trader
const getAllTrader=asyncHandler(
    async(req,res)=>{
      const traders= await Trader.find();
      res.status(200).json(traders)
    })
//get trader by id
const getTraderById=asyncHandler(
    async(req,res)=>{
        const trader=await Trader.findById(req.params.id)
        if(trader){
          res.status(200).json(trader)
        }else{
          res.status(404).json({message:'is not found'})
        }
      }
  )
//post new trader
const addNewTrader=asyncHandler(
    async (req,res)=>{
      const {error}=validatecreatetrader(req.body)
      if(error){
        return res.status(404).json({message: error.details[0].message});
      }
        const trader=new Trader({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email
                                })
     const result= await trader.save()
      res.status(201).json(result);
      
    }
  )
//update trader
const updateTrader=asyncHandler(
    async(req,res)=>{
      const {error}=validateupdatetrader(req.body);
      if(error){
          res.status(400).json({message:error.details[0].message})
      }
        const trader= await Trader.findByIdAndUpdate(req.params.id,{
          $set:{
            name:req.body.name,
            number:req.body.number,
            email:req.body.email
          }
        },{new:true})
        res.status(200).json(trader);
      
  }
  )
//delete trader
const deleteTrader=asyncHandler(
    async(req,res)=>{
        const trader=await Trader.findById(req.params.id)
      if(trader){
          await Trader.findByIdAndDelete(req.params.id)
          res.status(200).json(trader)
      }else{
          res.status(404).json({message:'trader is not found'})
      }
  }
  )

module.exports={
    getAllTrader,
    getTraderById,
    addNewTrader,
    updateTrader,
    deleteTrader
}