const { prisma } = require("../../config/prisma");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.user.id}`);

    // Join all chats the user participates in
    socket.on("joinChats", async () => {
      const chats = await prisma.chat.findMany({
        where: { users: { some: { userId: socket.user.id } } },
        select: { id: true },
      });
      chats.forEach((chat) => socket.join(chat.id));
      console.log(`✅ ${socket.user.id} joined ${chats.length} rooms`);
    });

    // Send message handler
    socket.on("sendMessage", async (data) => {
      const { chatId, content, type = "TEXT", media, mediaUrl } = data;

      const message = await prisma.message.create({
        data: {
          chatId,
          senderId: socket.user.id,
          content,
          type,
          media,
          mediaUrl,
        },
        include: { sender: true },
      });

      // Broadcast message to all users in chat room
      io.to(chatId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.user.id}`);
    });
  });
};

module.exports = chatSocket;