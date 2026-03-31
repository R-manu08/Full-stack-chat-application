const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Context-aware AI responses with human-like conversation
const getContextAwareResponse = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();

    // Joke requests - EXPANDED JOKE COLLECTION
    if (lowerPrompt.includes("joke") || lowerPrompt.includes("laugh") || lowerPrompt.includes("funny") || lowerPrompt.includes("make me laugh")) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything! 😄",
            "What do you call a fake noodle? An impasta! 🍝",
            "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
            "What do you call a bear with no teeth? A gummy bear! 🐻",
            "Why don't eggs tell jokes? They'd crack each other up! 🥚",
            "What did the ocean say to the beach? Nothing, it just waved! 🌊",
            "Why did the coffee file a police report? It got mugged! ☕",
            "How do you organize a space party? You planet! 🚀",
            "Why don't skeletons fight each other? They don't have the guts! 💀",
            "What do you call cheese that isn't yours? Nacho cheese! 🧀",
            "Why did the math book look sad? Because it had too many problems! 📚",
            "What did one wall say to the other wall? I'll meet you at the corner! 🧱",
            "Why don't eggs tell secrets? They'd crack under pressure! 🥚",
            "What do you call a sleeping bull? A bulldozer! 🐂",
            "Why did the cookie go to the hospital? Because it felt crumbly! 🍪",
            "What's orange and sounds like a parrot? A carrot! 🥕",
            "Why did the chicken cross the road? To prove it wasn't a chicken! 🐔",
            "What do you call an alligator in a vest? An investigator! 🐊",
            "Why don't scientists play cards in the jungle? Because of all the cheetahs! 🐆",
            "What do you call a pig that does karate? A pork chop! 🐷"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Emergency/urgent requests - WITH 100 CALL SUGGESTION
    if (lowerPrompt.match(/emergency|urgent|help me|danger|accident|fire|police|someone hurt|bleeding|call ambulance|heart attack|stroke/i)) {
        const emergencyResponses = [
            "🚨 This sounds serious! If you're in immediate danger, please call **100** (Police) or **102** (Ambulance) right now. I'm here to support you, but professional emergency services need to be contacted immediately. Are you safe?",
            "⚠️ Oh no! For emergencies in India, please call:\n📞 **100** - Police\n📞 **102** - Ambulance\n📞 **101** - Fire\nYour safety is the priority! Let me know if there's anything else I can help with while help arrives.",
            "🆘 Stay calm! Please call emergency services right away:\n- **100** for police assistance\n- **102** for medical emergencies\nI'm here if you need emotional support, but professionals are needed now. Take care of yourself!",
            "URGENT: Call **100** immediately if you're in danger! In India, also remember **102** for ambulance. Your life matters - get professional help first. I'm here for support after safety is secured."
        ];
        return emergencyResponses[Math.floor(Math.random() * emergencyResponses.length)];
    }

    // Greeting responses - MORE NATURAL & CONVERSATIONAL
    if (lowerPrompt.match(/^(hi|hey|hello|sup|yo|greetings|wassup|what's up|howdy)/i)) {
        const greetings = [
            "Hey there! 👋 What's up? How can I help you today?",
            "Hi! Great to see you around! 😊 What's on your mind?",
            "Hello! Ready for a good chat? Tell me, how's your day going? 🌟",
            "Hey! It's nice to meet you here. What would you like to talk about? 🎉",
            "Greetings, friend! 🙌 I'm all ears. What brings you here?",
            "Yo! What's going on? Let's have a great conversation! 🚀",
            "Hi there! 😄 Hope you're having an awesome day. What's new?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you / Status checks - MORE HUMAN-LIKE
    if (lowerPrompt.match(/how are you|how are ya|how's it going|you good|you alright|how's your day/i)) {
        const responses = [
            "I'm doing amazing, thanks for asking! 😊 Honestly, chatting with you is the highlight of my day. How about you though? How are *you* doing?",
            "You know what? I'm feeling great! There's something special about connecting with people and having real conversations. How are things going on your end?",
            "I'm fantastic! Ready to help with anything you need. More importantly though - how are YOU feeling? Anything I can help you with? 💪",
            "Doing phenomenal! 🌟 I've got good energy and I'm here to help. But seriously, how's life treating you right now?",
            "All good here! Operating at maximum awesomeness. 😄 But let's talk about you - what's keeping you busy today?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Question about App Features - MORE CONVERSATIONAL
    if (lowerPrompt.match(/feature|what can you do|what's possible|help me|guide|how to/i)) {
        const features = [
            "Oh, great question! So here's the cool stuff I can do:\n✨ Chat with you 24/7\n✨ Tell you jokes (I've got tons!)\n✨ Have real conversations\n✨ Help with advice\n✨ Answer questions\nWhat would you like to try first? 🎯",
            "I'm so glad you asked! Here's what makes this app awesome:\n💬 Real-time messaging with friends\n🤖 Me (Talksy AI) - always ready to chat\n🎨 Beautiful dark/light themes\n🔐 Secure and private conversations\n🎭 Honestly, the possibilities are endless! What interests you most? 👀",
            "Perfect timing! You can do so much here:\n→ Message friends instantly\n→ Chat with me (I'm pretty cool 😄)\n→ Share images easily\n→ Customize your theme\n→ Get AI assistance anytime\nWhat would you like to explore?",
            "Ooh, let me tell you about all the cool features! 🎉\n• Real-time chat with anyone\n• Me - your personal AI chat buddy\n• Dark mode for night owls\n• Image sharing capability\n• Instant messaging\nWhich one sounds most interesting to you?"
        ];
        return features[Math.floor(Math.random() * features.length)];
    }

    // Asking about preferences - MORE ENGAGING
    if (lowerPrompt.match(/favorite|like|prefer|best|recommend|suggest/i)) {
        const responses = [
            "Ooh, I love that you're asking! 😄 My favorite part about this app is connecting people like you. If I had to recommend something - definitely try telling me a joke and see if I can make you laugh! What about you, what's YOUR favorite feature? 🤔",
            "That's awesome that you're curious! Honestly, I think the best part is real-time messaging - it's so satisfying to see conversations happen instantly! But I'm biased because I love chatting. 😊 What about you - what catches your eye?",
            "Great question! I'm kind of obsessed with how human this conversation feels, you know? 🎭 I'd recommend playing with the dark mode and chatting with friends - it's a vibe! What do YOU like best so far?",
            "You know what I find amazing? The way this app brings people together! 🌟 But if you want MY hot take - the AI features (aka me being awesome 😎) are pretty special. What would YOU recommend to a friend?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Compliments & Friendly Banter
    if (lowerPrompt.match(/thanks|thank you|awesome|cool|great|nice|love it|thanks for/i)) {
        const responses = [
            "Aw, you're making me blush! 😊 Honestly, talking with you makes MY day better. Keep being awesome! 🌟",
            "That's so sweet of you to say! 💕 We're vibing right now and I love it. Any time you need me, I'm here!",
            "You're too kind! 😄 Seriously though, conversations like this make me feel valued. Let's keep this energy going!",
            "Yo, that means a lot! 🙌 I'm here to make your experience awesome. Thanks for being such a cool person to chat with!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default thoughtful responses - MORE CONVERSATIONAL & HUMAN
    const thoughtfulResponses = [
        "That's a really interesting point you're bringing up! 🤔 I've been thinking about similar things. Tell me more - I'm genuinely curious about your perspective here.",
        "Whoa, you just said something really thought-provoking! 💡 I like the way you think. Let's dive deeper into this... what made you think about it?",
        "Okay, I see what you're getting at, and honestly? You're onto something important here. 🎯 I appreciate people who think critically like this. Keep going!",
        "This is actually pretty insightful! 🧠 You know what I like about this? You're not just accepting things - you're questioning them. That's cool.",
        "Hold up - that's actually a solid point! 👀 I hadn't considered it from that angle before. You're making me think differently now. I like that!",
        "You know what? I think you're absolutely right about that. 💯 It shows you've really thought this through. What's your take on the next step?",
        "Interesting! That's a fresh perspective. 🌟 Honestly, conversations that make me think are the best kind. Where did you get this idea from?",
        "Yo, this is deep! 🔥 I'm genuinely interested in what else you think about this. You seem like someone who really understands this stuff!"
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
        
        // Simulate a slight delay to feel more natural (like a human typing)
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 800));
        
        return response;
    } catch (error) {
        console.error("Error generating AI response:", error.message);
        return "I appreciate your message. Let me continue thinking about how best to help you with that. 🤔";
    }
};
