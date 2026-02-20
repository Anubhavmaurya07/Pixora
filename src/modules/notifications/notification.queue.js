const { Queue } = require("bullmq");
const { redis } = require("../../config/redis");

const notificationQueue = new Queue("notifications", { connection: redis });

const addNotificationJob = async (data) => {
    await notificationQueue.add("sendNotification", data, {
        attempts: 3,
        backoff: 5000,
    })
}

module.exports = { notificationQueue, addNotificationJob };