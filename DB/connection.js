import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose"
const connectDB = async ()=>{
    return await mongoose.connect(process.env.LOCALDB)
    .then(result =>{
        console.log(`DB Connected`);
    })
    .catch(error =>{
        console.log(`Fail to Connect DB ${error}`);
    })
}

export default connectDB