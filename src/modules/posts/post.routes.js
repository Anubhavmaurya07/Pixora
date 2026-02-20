const { verifyJWT } = require("../../middlewares/auth.middleware");
const { createPost, getSinglePost, getAllPostOfUser, deletePost, updatePost } = require("./post.controller");

const postRouter = require("express").Router();


postRouter.use(verifyJWT);
postRouter.post("/create-post", createPost);
postRouter.get("/single-post/:id", getSinglePost);
postRouter.get("/user-all-post", getAllPostOfUser);
postRouter.delete("/delete-post/:id", deletePost);
postRouter.patch("/update-post/:id", updatePost);


module.exports = postRouter;