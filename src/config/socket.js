const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const chatSocket = require("../modules/chat/chat.socket");
require("dotenv").config();

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // ✅ Global JWT authentication middleware for sockets
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error("Authentication token missing"));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; 
            next();
        } catch (error) {
            next(new Error("Invalid or expired token"));
        }
    })

    chatSocket(io);
    return io;
}

module.exports = { initializeSocket };