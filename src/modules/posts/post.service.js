const ApiError = require("../../utils/ApiError")
const {
  createPost,
  findPostsByUserId,
  deletePostById,
  findPostByIdAndUpdate,
  findPostById,
} = require("./post.repository")

const create = async (postData) => {
  const { caption, imageUrl, userId } = postData
  const post = await createPost({
    caption,
    imageUrl,
    userId,
  })
  return { post }
}

const singlePost = async (id) => {
  const post = await findPostById(id)
  return { post }
}

const getPostOfUser = async (id) => {
  const result = await findPostsByUserId(id)
  return { result }
}

const deletePostService = async (id, userId) => {
  const post = await findPostById(id)
  if (!post) {
    throw new ApiError(404, "Post not found!")
  }
  if (post.userId !== userId) {
    throw new ApiError(403, "Not allowed to delete this post")
  }
  const result = await deletePostById(id)
  return { result }
}

const updatePostService = async (id, data, userId) => {
  const post = await findPostById(id)
  if (!post) {
    throw new ApiError(404, "Post not found!")
  }
  if (post.userId !== userId) {
    throw new ApiError(403, "Not allowed to update this post")
  }
  const result = await findPostByIdAndUpdate(id, data)
  return { result }
}

module.exports = { create, singlePost, getPostOfUser, deletePostService, updatePostService }
