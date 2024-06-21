import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

// another approach of connecting to the database

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGO DB connected !! DB Hosted  ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Error", error);
        process.exit(1)
    }
}

export default connectDB;