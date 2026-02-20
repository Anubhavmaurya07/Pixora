const ApiError = require("../../utils/ApiError")
const {
  createCommentService,
  deleteCommentService,
} = require("./comment.service")

const createComment = async (req, res, next) => {
  try {
    const { text } = req.body
    const { postId } = req?.params
    if (!postId) throw new ApiError(400, "postId is required")
    if (!text) throw new ApiError(400, "Text is required")
    const result = await createCommentService({
      text,
      userId: req?.user?.id,
      postId,
    })
    res.status(201).json({
      success: true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req?.params
    if (!commentId) throw new ApiError(400, "commentId is required")
    const result = await deleteCommentService(commentId, req?.user?.id)
    res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createComment, deleteComment }
