import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`mongo db connection established`)
        
    } catch (error) {

        console.log("mongoDB connection error",error)
        process.exit(1)
        
    }
}

export default connectDB;