const { NotificationType } = require("@prisma/client");
const { createNotification, getNotification, markAllRead } = require("./notification.repository");
const { addNotificationJob } = require("./notification.queue");

const notifyLike = async (post, actorId) => {
  if (!post?.userId) return;

  // Instead of creating the notification directly, queue it
  await addNotificationJob({
    receiverId: post.userId,
    actorId,
    type: NotificationType.LIKE,
    postId: post.id,
  });

  console.log(`📬 Queued like notification for post ${post.id}`);
};

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

const sendNotification = async ({ receiverId, message, type }) => {
    console.log(`📩 Sending '${type}' notification to ${receiverId}: ${message}`);
    await new Promise((r) => setTimeout(r, 1500));
    console.log(`✅ Notification delivered to ${receiverId}`);
};

module.exports = { notifyLike, notifyComment, notifyFollow, fetchNotification, markAllNotificationsAsRead, sendNotification }
