const express=require('express');
const {verifyTkenAndAdmin}=require('../middelware/virtfytoken')
const router=express.Router()
const {getAllProdutcs,getProductById,addNewProduct,updateProduct,deleteProducts}=require('../controllers/productsController')

router.route('/')
      .get(getAllProdutcs)
      .post(verifyTkenAndAdmin,addNewProduct)

router.route('/:id')
      .get(getProductById)
      .put(verifyTkenAndAdmin,updateProduct)
      .delete(verifyTkenAndAdmin,deleteProducts)



module.exports=router;