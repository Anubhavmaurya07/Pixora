const prisma = require("../../config/prisma");

// get all following user id for requested user
const getFollowingIds = async (userId) => {
    const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
    });
    return follows.map(user => user.followingId);
};

/**
 * Fetch feed posts using keyset pagination
 * @param {Object} params
 * @param {String[]} params.feedUserIds
 * @param {Object|null} params.cursor - { createdAt, id }
 * @param {Number} params.limit
 */

const getFeedPosts = async ({ feedUserIds, cursor, limit }) => {
    const where = {
        userId: { in: feedUserIds }
    };

    if (cursor) {
        const { createdAt, id } = cursor;
        where.AND = [
            {
                OR: [
                    { createdAt: { lt: new Date(createdAt) } },
                    {
                        AND: [{ createdAt: new Date(createdAt) }, { id: { lt: id } }]
                    }
                ]
            }
        ]
    }

    const posts = await prisma.post.findMany({
        where,
        orderBy: [
            { createdAt: "desc" },
            { id: "desc" },
        ],
        take: limit + 1,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profilePic: true,
                }
            }
        }
    });

    return posts;
}

module.exports = { getFollowingIds, getFeedPosts }