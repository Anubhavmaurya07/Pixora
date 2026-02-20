const { NotificationType } = require("@prisma/client");
const { createNotification, getNotification, markAllRead } = require("./notification.repository");

const notifyLike = async (post, actorId) => {
    if (!post?.userId) return;
    await createNotification({
        receiverId: post?.userId,
        actorId,
        type: NotificationType.LIKE,
        postId: post?.id,
    })
}

const notifyComment = async (post, actorId) => {
    if (!post?.userId) return;
    await createNotification({
        receiverId: post?.userId,
        actorId,
        type: NotificationType.COMMENT,
        postId: post?.id,
    })
}

const notifyFollow = async (receiverId, actorId) => {
    if (!post?.userId) return;
    await createNotification({
        receiverId,
        actorId,
        type: NotificationType.FOLLOW,
    })
}

const fetchNotification = async (receiverId, cursor, limit) => {
    return getNotification(receiverId, cursor, limit);
}

const markAllNotificationsAsRead = async (receiverId) => {
    return markAllRead(receiverId);
}

module.exports = { notifyLike, notifyComment, notifyFollow, fetchNotification, markAllNotificationsAsRead }
