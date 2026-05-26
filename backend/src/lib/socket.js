import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
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

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

export { io, app, server };