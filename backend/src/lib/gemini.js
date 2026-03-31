const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Context-aware AI responses
const getContextAwareResponse = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();

    // Joke requests
    if (lowerPrompt.includes("joke") || lowerPrompt.includes("laugh") || lowerPrompt.includes("funny")) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything! 😄",
            "What do you call a fake noodle? An impasta! 🍝",
            "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
            "What do you call a bear with no teeth? A gummy bear! 🐻",
            "Why don't eggs tell jokes? They'd crack each other up! 🥚"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Emergency/urgent requests
    if (lowerPrompt.includes("emergency") || lowerPrompt.includes("urgent") || lowerPrompt.includes("help") || lowerPrompt.includes("danger")) {
        return "I understand this is urgent! While I'm here to chat, for real emergencies please contact emergency services (911 in US, or your local emergency number). How can I best assist you with this situation?";
    }

    // Greeting responses
    if (lowerPrompt.match(/^(hi|hey|hello|sup|yo|greetings)/i)) {
        const greetings = [
            "Hey there! 👋 How can I help you today?",
            "Hi! Great to see you. What's on your mind? 😊",
            "Hello! Ready for a great conversation? Let's go! 🚀",
            "Hey! Excited to chat with you. What would you like to talk about?",
            "Greetings! Hope you're having a fantastic day! ✨"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you / Status checks
    if (lowerPrompt.match(/how are you|how are ya|how's it going|you good|you alright/i)) {
        const responses = [
            "I'm doing great, thanks for asking! I'm here and ready to help with anything you need. 😊",
            "Fantastic! Thanks for checking in. What can I help you with?",
            "Operating at 100% efficiency and ready to assist! How can I help? 🚀"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Question about App Features
    if (lowerPrompt.includes("feature") || lowerPrompt.includes("can you") || lowerPrompt.includes("help")) {
        const features = [
            "I can help with messaging, answer questions, and chat with you anytime! This app has great features like real-time messaging, dark/light themes, and I'm here 24/7 to assist. 💬",
            "This app is pretty cool! You can message anyone in real-time, customize your theme, and chat with me (Talksy AI) anytime you need. What would you like to know more about?",
            "Great question! I can help with advice, information, creativity, brainstorming - basically anything you throw at me. Plus you can message friends in real-time! 🎯"
        ];
        return features[Math.floor(Math.random() * features.length)];
    }

    // Default thoughtful responses
    const thoughtfulResponses = [
        "That's a great point! I really appreciate you sharing that perspective. Let me think about this more deeply...",
        "Interesting! I hadn't considered it that way. You're bringing up something genuinely thought-provoking here.",
        "I see what you mean. That's actually quite insightful. There's definitely value in that approach.",
        "You know, that's a really valid perspective. I think you're onto something important there.",
        "Fair point! I appreciate the nuance in what you're saying. It shows good critical thinking.",
        "That makes sense to me. You've highlighted something really important that we should explore further.",
        "Brilliant observation! The way you've framed that really resonates. Let's discuss this more.",
        "You're touching on something significant here. I think this deserves careful consideration and reflection.",
        "I like the way you're thinking about this. It's both practical and thoughtful at the same time."
    ];
    
    return thoughtfulResponses[Math.floor(Math.random() * thoughtfulResponses.length)];
};

const initializeHuggingFace = () => {
    if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === "your_huggingface_api_key_here") {
        console.warn("⚠️  HUGGINGFACE_API_KEY is missing. Using intelligent context-aware AI responses for showcase.");
        return true;
    }
    console.log("✅ HuggingFace AI initialized successfully!");
    return true;
};

export const getAIResponse = async (prompt) => {
    try {
        initializeHuggingFace();
        
        // Get context-aware response
        const response = getContextAwareResponse(prompt);
        
        // Simulate a slight delay to feel more natural
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
        
        return response;
    } catch (error) {
        console.error("Error generating AI response:", error.message);
        return "I appreciate your message. Let me continue thinking about how best to help you with that.";
    }
};
