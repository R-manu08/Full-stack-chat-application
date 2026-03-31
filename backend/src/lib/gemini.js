import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;
let model = null;

const initializeGemini = () => {
    const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === "your_gemini_api_key_here") {
            console.warn("⚠️  GEMINI_API_KEY is missing. AI Chat will use mock responses.");
            return null;
        }
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    return model;
};

export const getAIResponse = async (prompt) => {
    try {
        if (!model) {
            model = initializeGemini();
        }

        if (!model) {
            return "Reach out to my full intelligence! 🤖 Please add a valid **GEMINI_API_KEY** to your `.env` file. You can get one for free at: https://aistudio.google.com/app/apikey";
        }

        const systemPrompt = `You are "Talksy AI", a friendly and intelligent chat assistant integrated into this Full-Stack Chat Application. 
        You help users with their questions and can provide information about project features.
        The app is mobile-responsive and supports real-time messaging, user search, and security headers.
        If a user asks about mobile access, tell them to visit http://10.223.152.181:5173 on their Wi-Fi.
        Keep your responses concise and helpful.`;

        const result = await model.generateContent(systemPrompt + "\n\nUser: " + prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
        return "Sorry, I'm having trouble thinking right now. Please try again later! 🧠💨";
    }
};
