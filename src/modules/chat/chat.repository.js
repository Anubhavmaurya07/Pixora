const prisma = require("../../config/prisma")

const createChat = async (userIds) => {
    return prisma.chat.create({
        data: {
            users: {
                create: userIds?.map((id) => ({ user: { connect: { id } } }))
            }
        },
        include: { users: { include: { user: true } } },
    })
}

const getUserChat = async (userId) => {
    return prisma.chat.findMany({
        where: {
            users: { some: { userId } },
        },
        include: {
            users: { include: { user: true } },
            messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
            }
        }
    })
}

const createMessage = async (data) => {
    return prisma.message.create({
        data,
        include: { sender: true },
    });
}

// Check if chat already exists between given users (1-to-1)
const findExistingChat = async (userIds) => {
    return prisma.chat.findFirst({
        where: {
            AND: [
                { users: { some: { userId: userIds[0] } } },
                { users: { some: { userId: userIds[1] } } },
            ],
        },
        include: {
            users: { include: { user: true } },
            messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
            }
        },
    })
}

module.exports = { createChat, getUserChat, createMessage, findExistingChat }