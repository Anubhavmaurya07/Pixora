const prisma = require("../../config/prisma")

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  })
}

const createUser = async (data) => {
  return prisma.user.create({
    data,
  })
}

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  })
}

module.exports = { findUserByEmail, createUser, findUserById }
