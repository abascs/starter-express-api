const mongoose=require('mongoose')

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connect to mongodb sucseefully')
    } catch (error) {
        console.log('connect to mongodb fail')
        process.exit(1)
    }
}

module.exports=connectToDB;