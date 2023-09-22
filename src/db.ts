import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatdb');
        console.log('Connected to Chat DB');
    } catch (e) {
        console.log('failed to connect database');
    }
};

export default connectDB;