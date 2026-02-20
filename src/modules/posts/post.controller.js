const ApiError = require("../../utils/ApiError")
const {
  create,
  singlePost,
  getPostOfUser,
  deletePostService,
  updatePostService,
} = require("./post.service")

const createPost = async (req, res, next) => {
  try {
    const { caption, imageUrl } = req.body

    if (!imageUrl || typeof imageUrl !== "string") {
      throw new ApiError(400, "Valid Image URL is required")
    }

    if (!caption?.trim()) {
      throw new ApiError(400, "Caption is required")
    }

    const result = await create({
      caption,
      imageUrl,
      userId: req.user.id,
    })
    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSinglePost = async (req, res, next) => {
  try {
    const result = await singlePost(req?.params?.id)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllPostOfUser = async (req, res, next) => {
  try {
    const result = await getPostOfUser(req?.user?.id)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deletePost = async (req, res, next) => {
  try {
    const result = await deletePostService(req?.params?.id, req?.user?.id)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { caption, imageUrl } = req.body
    let data = {}

    if (caption !== undefined) data.caption = caption
    if (imageUrl !== undefined) data.imageUrl = imageUrl

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, "Nothing to update")
    }

    const result = await updatePostService(req.params.id, data, req.user.id)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPost,
  getSinglePost,
  getAllPostOfUser,
  deletePost,
  updatePost,
}
