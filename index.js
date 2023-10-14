const express=require('express');
const productpath=require('./route/products')
const traderpath=require('./route/trader')
const authpath=require('./route/auth')
const userpath=require('./route/user')
const dotenv=require('dotenv')
const connectToDB=require('./config/connectToDB')
const app=express();
app.use(express.json())
dotenv.config()

connectToDB();

app.use('/api/products',productpath)
app.use('/api/trader',traderpath)
app.use('/api/auth',authpath)
app.use('/api/user',userpath)

//error hander middelware
app.use((req,res,next)=>{
    const error =new Error(`not found ${req.originalUrl}`);
    res.status(404);
    next(error)
})
app.use((err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode).json({message:err.message})
})

app.listen(3000||process.env.PORT,()=> console.log(`server is running on port ${process.env.PORT}`))