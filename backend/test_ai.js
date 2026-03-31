import dotenv from "dotenv";
import { getAIResponse } from "./src/lib/gemini.js";

dotenv.config();

const testAI = async () => {
    console.log("Testing Gemini with API Key:", process.env.GEMINI_API_KEY ? "PRESENT" : "MISSING");
    try {
        const response = await getAIResponse("Say 'Hello World'");
        console.log("Response:", response);
    } catch (error) {
        console.error("Gemini Error:", error.message);
        if (error.stack) console.error(error.stack);
    }
};

testAI();
