const { verifyJWT } = require("../../middlewares/auth.middleware");
const { createComment, deleteComment } = require("./comment.controller");

const commentRouter = require("express").Router();

commentRouter.use(verifyJWT);

commentRouter.post("/:postId", createComment);
commentRouter.delete("/:commentId", deleteComment);

module.exports = commentRouter;