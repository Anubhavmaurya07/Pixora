const { verifyJWT } = require("../../middlewares/auth.middleware");
const { toggleLike } = require("./like.controller");

const likeRouter = require("express").Router();

likeRouter.use(verifyJWT);

likeRouter.post("/post/:postId/like", toggleLike)

module.exports = likeRouter