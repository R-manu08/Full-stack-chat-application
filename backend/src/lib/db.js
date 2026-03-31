import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/user.model.js";

let mongoMemoryServer = null;

export const connectDB = async (retries = 5, delay = 5000) => {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri || uri.includes("your_mongodb_connection_string")) {
            console.log("No valid MONGODB_URI found. Starting In-Memory MongoDB for testing...");
            await startMemoryServer();
        } else {
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB connected: ${conn.connection.host}`);
        }
        
        // Initialize AI Bot User
        await initializeAIUser();

    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        
        if (process.env.MONGODB_URI?.includes("localhost:27017") && !mongoMemoryServer) {
            console.log("Local MongoDB not found. Falling back to In-Memory MongoDB...");
            await startMemoryServer();
            await initializeAIUser();
            return;
        }

        if (retries > 0) {
            console.log(`Retrying connection in ${delay / 1000}s... (${retries} retries left)`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        } else {
            console.error("Critical: Could not connect to MongoDB after multiple attempts.");
            console.log("Emergency: Starting In-Memory MongoDB to make the app 'Work'...");
            await startMemoryServer();
            await initializeAIUser();
        }
    }
};

const startMemoryServer = async () => {
    try {
        if (!mongoMemoryServer) {
            mongoMemoryServer = await MongoMemoryServer.create();
            const uri = mongoMemoryServer.getUri();
            await mongoose.connect(uri);
            console.log("✅ In-Memory MongoDB started and connected!");
        }
    } catch (error) {
        console.error("Failed to start In-Memory MongoDB:", error.message);
    }
};

const initializeAIUser = async () => {
    try {
        const aiId = "000000000000000000000001"; // Fixed ID for AI Bot
        const aiUser = await User.findById(aiId);
        
        if (!aiUser) {
            await User.create({
                _id: aiId,
                fullName: "Talksy AI ✨",
                email: "ai@talksy.app",
                password: "virtual_user_password_hidden",
                profilePic: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            });
            console.log("🤖 Talksy AI Assistant initialized in database.");
        }
    } catch (error) {
        console.error("Error initializing AI User:", error.message);
    }
};