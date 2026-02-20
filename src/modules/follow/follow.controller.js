const ApiError = require("../../utils/ApiError")
const { followService, unfollowService } = require("./follow.service")

const followUser = async (req, res, next) => {
  try {
    const followingId = req?.params?.userId
    if (!followingId) throw new ApiError(400, "followingid is required!")
    if (followingId === req?.user?.id)
      throw new ApiError(400, "Self follow is not allowed!")

    const result = await followService({
      followerId: req?.user?.id,
      followingId,
    })
    res.status(201).json({
      success: true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

const unFollowUser = async (req, res, next) => {
  try {
    const unfollowingId = req?.params?.userId
    if (!unfollowingId) throw new ApiError(400, "followingid is required!")
    if (unfollowingId === req?.user?.id)
      throw new ApiError(400, "Self unfollow is not allowed!")
    const result = await unfollowService({
      followerId: req?.user?.id,
      followingId: unfollowingId,
    })
    res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { followUser, unFollowUser }
