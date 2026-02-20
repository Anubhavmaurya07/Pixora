const { Worker } = require("bullmq");
const { redis } = require("../../../config/redis");
const { createNotification } = require("../notification.repository"); 

const worker = new Worker(
  "notifications",
  async (job) => {
    const { receiverId, actorId, type, postId } = job.data;
    console.log(`📦 Processing ${type} notification for user ${receiverId}`);

    await createNotification({
      receiverId,
      actorId,
      type,
      postId,
    });

    console.log(`✅ Notification created for user ${receiverId}`);
  },
  { connection: redis }
);

worker.on("completed", (job) => console.log(`✅ Job ${job.id} done`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job.id} failed:`, err.message));