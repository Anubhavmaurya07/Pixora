const ApiError = require("../../utils/ApiError");
const { findExistingChat, createChat, getUserChat, createMessage } = require("./chat.repository");

const createChatService = async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length < 2) {
        throw new ApiError(400, "At least two user IDs are required to create a chat.");
    }

    const existingChat = await findExistingChat(userIds);
    if (existingChat) return existingChat;

    return await createChat(userIds);
};

const getUserChatService = async (userId) => {
    return await getUserChat(userId);
};

const sendMessageService = async (data) => {
    return await createMessage(data);
};

module.exports = { createChatService, getUserChatService, sendMessageService };