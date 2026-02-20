const ApiError = require("../../utils/ApiError")
const { toggleLikeService } = require("./like.service")

const toggleLike = async (req, res, next) => {
  try {
    const { postId } = req?.params
    if (!postId) throw new ApiError(400, "post id is required!")
    const result = await toggleLikeService(postId, req?.user?.id)
    return res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { toggleLike }
