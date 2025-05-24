import mongoose from "mongoose"
import {MONGO_URI} from "../config/config.js"


const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default ConnectDB;