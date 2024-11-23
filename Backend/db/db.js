import mongoose from "mongoose";

const db = async () => {
    try {
        // Enclose the URI in quotes as a string
        const mongoURI = process.env.MONGO_URI; // Use your variable name here
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};

export default db;
