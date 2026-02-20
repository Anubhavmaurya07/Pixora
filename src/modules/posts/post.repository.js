const prisma = require("../../config/prisma")

// create a post
const createPost = async (data) => {
  return prisma.post.create({ data })
}

// get a post by id
const findPostById = async (id) => {
  return prisma.post.findUnique({ where: { id } })
}

// delete a post by id
const deletePostById = async (id) => {
  return prisma.post.delete({
    where: { id },
    select: { id: true },
  })
}

// get all post of a user
const findPostsByUserId = async (userId) => {
  return prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: { id, username },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

// update a post by id
const findPostByIdAndUpdate = async (id, data) => {
  return prisma.post.update({
    where: { id },
    data,
  })
}

module.exports = {
  createPost,
  findPostById,
  deletePostById,
  findPostsByUserId,
  findPostByIdAndUpdate,
}
