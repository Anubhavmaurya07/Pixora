require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const prisma = require("./src/config/prisma");
const { initializeSocket } = require("./src/config/socket");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // ✅ Connect to Database
    await prisma.$connect();
    console.log("✅ Database connected");

    // ✅ Create HTTP Server for Express
    const server = http.createServer(app);

    // 🔌 Initialize Socket.IO (auth + chat events)
    initializeSocket(server);

    // 🚀 Start Listening
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();
