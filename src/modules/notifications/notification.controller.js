const { fetchNotification, markAllNotificationsAsRead } = require("./notification.service");

const getNotificationsController = async (res, req, next) => {
    try {
        const userId = req?.user?.id;
        const { cursor, limit } = req?.query;
        const parsedLimit = Math.min(50, Math.max(5, Number(limit), 50));

        const { notifications, nextCursor } = await fetchNotification(userId, cursor, parsedLimit);
        res.status(200).json({
            succces: true,
            data: notifications,
            nextCursor,
        })
    } catch (error) {
        next(error);
    }
}

const markAsReadController = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        await markAllNotificationsAsRead(userId);
        res.status(200).json({
            succes: true,
            message: "All notifications are marked as read"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { getNotificationsController, markAsReadController }