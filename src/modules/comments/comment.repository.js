const prisma = require("../../config/prisma")
const ApiError = require("../../utils/ApiError")

const getCommentById = async (id) => {
  return prisma.comment.findUnique({
    where: {
      id,
    },
  })
}
const createCommentRepo = async (data) => {
  return prisma.$transaction(async (tx) => {
    const isPostExist = await tx.post.findUnique({
      where: {
        id: data?.postId
      }
    });
    if (!isPostExist) throw new ApiError(404, "Post not found")
    const createdComment = await tx.comment.create({ data })
    const updatedPost = await tx.post.update({
      where: {
        id: createdComment.postId,
      },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    })
    return { commented: true, totalComments: updatedPost.commentsCount, updatedPost }
  })
}

const deleteCommentRepo = async (commentId) => {
  return prisma.$transaction(async (tx) => {
    const deletedComment = await tx.comment.delete({
      where: {
        id: commentId,
      },
    });
    const updatedPost = await tx.post.update({
      where: {
        id: deletedComment.postId
      },
      data: {
        commentsCount: {
          decrement: 1
        }
      }
    })
    return { commentDeleted: true, totalComments: updatedPost.commentsCount }
  })
}

module.exports = { getCommentById, createCommentRepo, deleteCommentRepo }
