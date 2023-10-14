const Jwt=require('jsonwebtoken')
//verify token
function VerifyToken(req,res,next){
    const token =req.headers.token;
    if(token){
        try {
            const decoded=Jwt.verify(token,process.env.JWT_SECRECTKEY);
            req.user=decoded;
            next()
        } catch (error) {
            res.status(401).json({message:'invalid token'})
        }
    }else{
        res.status(401).json({message:'no token provided'})
    }
}
// verify token and authrize the user

function verifyTkenAndAuthorization(req,res,next){
    VerifyToken(req,res,()=>{
        if(req.user.id===req.params.id|| req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({message:"you are not allowed"})
        }
    })
}
//verify token and admin
function verifyTkenAndAdmin(req,res,next){
    VerifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({message:"you are not allowed, only admin allowed"})
        }
    })
}
module.exports={
    VerifyToken,
    verifyTkenAndAuthorization,
    verifyTkenAndAdmin
}