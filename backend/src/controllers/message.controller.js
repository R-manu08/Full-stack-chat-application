import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { getAIResponse } from "../lib/gemini.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsersForSidebbar", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);

    // AI Bot Response Logic
    const AI_BOT_ID = "000000000000000000000001";
    if (receiverId === AI_BOT_ID) {
      const aiResponseText = await getAIResponse(text);
      
      const aiMessage = new Message({
        senderId: AI_BOT_ID,
        receiverId: senderId,
        text: aiResponseText,
      });

      await aiMessage.save();

      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", aiMessage);
      }
    }

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const loggedInUserId = req.user._id;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const users = await User.find({
      _id: { $ne: loggedInUserId },
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSmartReplies = async (req, res) => {
  try {
    const { message } = req.query;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const prompt = `You are a helpful chat assistant. Given this incoming message: "${message}", suggest exactly 3 short, natural, conversational reply options. 
    Return ONLY a JSON array of 3 strings, no explanation, no markdown. Example: ["Sure!", "Sounds good!", "Let me check."]`;

    const { getAIResponse } = await import("../lib/gemini.js");
    const aiRaw = await getAIResponse(prompt);

    // Parse the JSON response - strip markdown code blocks if present
    let suggestions = [];
    try {
      const cleaned = aiRaw.replace(/```json|```/g, "").trim();
      suggestions = JSON.parse(cleaned);
      if (!Array.isArray(suggestions)) throw new Error("Not an array");
      suggestions = suggestions.slice(0, 3);
    } catch {
      // Fallback suggestions if parsing fails
      suggestions = ["Got it!", "Thanks for letting me know!", "Sure, I'll look into it."];
    }

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Error in getSmartReplies", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
