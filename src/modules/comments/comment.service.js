const ApiError = require("../../utils/ApiError")
const { notifyComment } = require("../notifications/notification.service")
const {
  deleteCommentRepo,
  getCommentById,
  createCommentRepo,
} = require("./comment.repository")

const createCommentService = async (data) => {
  const result = await createCommentRepo(data)
  if (result.commented) {
    await notifyComment(result.updatedPost, data?.userId)
  }
  return {
    commented: result.commented,
    totalComments: result.totalComments,
  }
}

const deleteCommentService = async (commentId, userId) => {
  const commentData = await getCommentById(commentId)
  if (!commentData) throw new ApiError(404, "Comment not found")
  if (commentData.userId !== userId)
    throw new ApiError(403, "You can not delete other user comment")
  const result = await deleteCommentRepo(commentId)
  return result
}

module.exports = { createCommentService, deleteCommentService }
