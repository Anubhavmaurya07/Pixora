const { verifyJWT } = require("../../middlewares/auth.middleware");
const { createChatController, getUserChatController, sendMessageController } = require("./chat.controller");
const chatRouter = require("express").Router();

chatRouter.use(verifyJWT);

chatRouter.post("/", createChatController);
chatRouter.get("/", getUserChatController);
chatRouter.post("/message", sendMessageController);

module.exports = chatRouter;