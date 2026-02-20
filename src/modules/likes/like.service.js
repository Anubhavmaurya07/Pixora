const ApiError = require("../../utils/ApiError")
const { notifyLike } = require("../notifications/notification.service")
const { findPostById } = require("../posts/post.repository")
const { toggleLikeRepo } = require("./like.repository")

const toggleLikeService = async (postId, userId) => {
  const isPostExist = await findPostById(postId)
  if (!isPostExist) {
    throw new ApiError(404, "Post does not exist")
  }

  const result = await toggleLikeRepo(postId, userId)
  if (result.liked) {
    await notifyLike(isPostExist, userId);
  }
  return {
    liked: result.liked,
    totalLikes: result.totalLikes,
  }
}

module.exports = { toggleLikeService }
