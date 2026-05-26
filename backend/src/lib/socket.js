import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|172\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/) || 
                origin.includes("loca.lt") || 
                origin.includes("ngrok-free.app") || 
                process.env.NODE_ENV !== "production") {
              return callback(null, true);
            }
            callback(null, false);
          },
        credentials: true
    }
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;

        // Automatically mark all 'sent' messages to this user as 'delivered'
        Message.find({ receiverId: userId, status: "sent" }).distinct("senderId")
            .then(senders => {
                if (senders && senders.length > 0) {
                    Message.updateMany(
                        { receiverId: userId, status: "sent" },
                        { $set: { status: "delivered" } }
                    ).then(() => {
                        senders.forEach(senderId => {
                            const senderSocketId = getReceiverSocketId(senderId.toString());
                            if (senderSocketId) {
                                io.to(senderSocketId).emit("messagesDelivered", { receiverId: userId });
                            }
                        });
                    });
                }
            })
            .catch(err => console.error("Error updating delivered status:", err));
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Typing Indicators
    socket.on("typing", ({ receiverId }) => {
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("userTyping", { senderId: userId });
        }
    });

    socket.on("stop-typing", ({ receiverId }) => {
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("userStoppedTyping", { senderId: userId });
        }
    });

    // WebRTC Video Call Signaling
    socket.on("call-user", ({ to, offer }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incoming-call", { from: userId, offer });
        }
    });

    socket.on("answer-call", ({ to, answer }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("call-answered", { answer });
        }
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("ice-candidate", { candidate });
        }
    });

    socket.on("decline-call", ({ to }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("call-declined");
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

export { io, app, server };