const createChatController = async (req, res, next) => {
    try {
        const { userIds } = req.body;

        // add current logged-in user if not already present
        const loggedInUserId = req.user.id;
        const participants = userIds.includes(loggedInUserId)
            ? userIds
            : [...userIds, loggedInUserId];

        const chat = await createChatService(participants);
        res.status(201).json({
            success: true,
            chat,
        });
    } catch (error) {
        next(error);
    }
};

const getUserChatController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const chats = await getUserChatService(userId);
        res.status(200).json({ success: true, chats });
    } catch (error) {
        next(error);
    }
};

const sendMessageController = async (req, res, next) => {
    try {
        const senderId = req.user.id;
        const data = { ...req.body, senderId };
        const message = await sendMessageService(data);
        res.status(201).json({ success: true, message });
    } catch (error) {
        next(error);
    }
};

module.exports = { createChatController, getUserChatController, sendMessageController };