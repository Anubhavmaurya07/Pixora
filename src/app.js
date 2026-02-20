const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../src/modules/auth/auth.routes");
const errorHandler = require("../src/middlewares/error.middleware");
const postRouter = require("./modules/posts/post.routes");
const commentRouter = require("./modules/comments/comment.routes");
const likeRouter = require("./modules/likes/like.routes");
const followRouter = require("./modules/follow/follow.routes");
const feedRouter = require("./modules/feed/feed.routes");
const notificationRouter = require("./modules/notifications/notification.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/like", likeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/follow", followRouter);
app.use("/api/feed", feedRouter);
app.use("/api/notification", notificationRouter);

app.use(errorHandler);

module.exports = app;