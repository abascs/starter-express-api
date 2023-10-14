const {product}=require('./models/productmodel');
const {products}=require('./products');
const connectToDB=require('./config/connectToDB');
require('dotenv').config()
connectToDB();

const importbooks=async()=>{
    try {
        await product.insertMany(products);
        console.log('products imported')
        process.exit(1)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
const deletebooks=async()=>{
    try {
        await product.deleteMany();
        console.log('products imported')
        process.exit(1);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

if(process.argv[2]==="-import"){
    importbooks()
}else if(process.argv[2]==="-remove"){
    deletebooks()
}