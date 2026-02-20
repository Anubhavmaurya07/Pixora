const prisma = require("../../config/prisma")
const ApiError = require("../../utils/ApiError")
const { findUserById } = require("../auth/auth.repository")

const followRepo = async (data) => {
  // data ---> followerId, followingId
  return prisma.$transaction(async (tx) => {
    const isCorrectFollowing = await tx.user.findUnique({
      where: { id: data.followingId },
    })
    if (!isCorrectFollowing) throw new ApiError(404, "Following user not found")

    const isAlreadyFollowing = await tx.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: data.followerId,
          followingId: data.followingId,
        },
      },
    })

    if (isAlreadyFollowing) throw new ApiError(400, "Already following")

    await tx.follow.create({ data })

    const followingUserUpdate = await tx.user.update({
      where: {
        id: data.followingId,
      },
      data: {
        followersCount: {
          increment: 1,
        },
      },
    })

    const followerUserUpdate = await tx.user.update({
      where: {
        id: data.followerId,
      },
      data: {
        followingCount: {
          increment: 1,
        },
      },
    })

    return {
      followed: true,
      followingCount: followerUserUpdate.followingCount,
      followersCount: followingUserUpdate.followersCount,
    }
  })
}

const unFollowRepo = async (data) => {
  return prisma.$transaction(async (tx) => {
    const isCorrectUnfollowing = await tx.user.findUnique({
      where: { id: data.followingId },
    })

    if (!isCorrectUnfollowing)
      throw new ApiError(404, "Unfollowing user not found")

    const isFollowing = await tx.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: data.followerId,
                followingId: data.followingId,
            }
        }
    })

    if (!isFollowing) throw new ApiError(400, "Never follow this user")

    await tx.follow.delete({
      where: {
        followerId_followingId: {
          followerId: data.followerId,
          followingId: data.followingId,
        },
      },
    })

    const unfollowingUserUpdate = await tx.user.update({
      where: {
        id: data.followingId,
      },
      data: {
        followersCount: {
          decrement: 1,
        },
      },
    })

    const unfollowUserUpdate = await tx.user.update({
      where: {
        id: data.followerId,
      },
      data: {
        followingCount: {
          decrement: 1,
        },
      },
    })

    return {
      unfollowed: true,
      followingCount: unfollowUserUpdate.followingCount,
      followersCount: unfollowingUserUpdate.followersCount,
    }
  })
}

module.exports = { followRepo, unFollowRepo }
