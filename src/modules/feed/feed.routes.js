const { verifyJWT } = require("../../middlewares/auth.middleware");
const { getFeedController } = require("./feed.controller");

const feedRouter = require("express").Router();

feedRouter.use(verifyJWT);

feedRouter.get("/", getFeedController);

module.exports = feedRouter;