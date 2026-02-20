const prisma = require("../../config/prisma");

const createNotification = async ({ receiverId, actorId, type, postId = null }) => {
    if (receiverId === actorId) return null;

    return prisma.notification.create({
        data: { receiverId, actorId, type, postId }
    })
}

const getNotification = async (receiverId, cursor = null, limit = 20) => {
    const where = { receiverId };
    if (cursor) {
        where.createdAt = { lt: new Date(cursor) };
    }
    const notifications = await prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        include: {
            actor: {
                select: { id: true, username: true, profilePic: true }
            },
            post: {
                select: { id: true, imageUrl: true }
            }
        }
    })

    let nextCursor = null;
    if (notifications.length > limit) {
        const lastNotification = notifications[limit - 1];
        nextCursor = lastNotification.createdAt.toISOString();
        notifications.splice(limit);
    }

    return { notifications, nextCursor }
}

const markAllRead = async (receiverId) => {
    await prisma.notification.updateMany({
        where: { receiverId, read: false },
        data: { read: true }
    })
}

module.exports = { createNotification, getNotification, markAllRead }