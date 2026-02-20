const { verifyJWT } = require("../../middlewares/auth.middleware");
const { getNotificationsController, markAsReadController } = require("./notification.controller");

const notificationRouter = require("express").Router();

notificationRouter.use(verifyJWT)

notificationRouter.get("/", getNotificationsController);
notificationRouter.put("/read", markAsReadController);

module.exports = notificationRouter;