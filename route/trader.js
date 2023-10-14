const express=require('express');
const {verifyTkenAndAdmin}=require('../middelware/virtfytoken')
const router=express.Router()
const {getAllTrader,getTraderById,addNewTrader,updateTrader,deleteTrader}=require('../controllers/traderController')

router.route('/').get(getAllTrader).post(verifyTkenAndAdmin,addNewTrader)

router.route('/:id')
      .get(getTraderById)
      .put(verifyTkenAndAdmin,updateTrader)
      .delete(verifyTkenAndAdmin,deleteTrader)


module.exports=router;