const prisma = require("../../config/prisma")

const toggleLikeRepo = async (postId, userId) => {
  return prisma.$transaction(async (tx) => {
    const existingLike = await tx.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    if (existingLike) {
      // unlike
      await tx.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      })

      const updatedPost = await tx.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      })

      return { liked: false, totalLikes: updatedPost.likesCount }
    } else {
      // like
      await tx.like.create({
        data: {
          userId,
          postId,
        },
      })

      const updatedPost = await tx.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      })

      

      return { liked: true, totalLikes: updatedPost.likesCount }
    }
  })
}

module.exports = { toggleLikeRepo }
