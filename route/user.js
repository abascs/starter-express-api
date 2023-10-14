const express=require('express');
const router=express.Router()
const {verifyTkenAndAdmin,verifyTkenAndAuthorization}=require('../middelware/virtfytoken')
const {updateUser,getUsersForAdmin,getUserById,deleteUser}=require('../controllers/userController')


router.route('/:id')
        .put(verifyTkenAndAuthorization,updateUser)
        .get(verifyTkenAndAuthorization,getUserById)
        .delete(verifyTkenAndAuthorization,deleteUser)
router.get('/',verifyTkenAndAdmin,getUsersForAdmin)


module.exports=router