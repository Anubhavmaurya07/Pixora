const { verifyJWT } = require("../../middlewares/auth.middleware");
const { followUser, unFollowUser } = require("./follow.controller");

const followRouter = require("express").Router();

followRouter.use(verifyJWT);

followRouter.post("/:userId", followUser)
followRouter.delete("/:userId", unFollowUser)

module.exports = followRouter;