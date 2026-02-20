const { notifyFollow } = require("../notifications/notification.service")
const { followRepo, unFollowRepo } = require("./follow.repository")

const followService = async (data) => {
  const result = await followRepo(data)
  if (result.followed) {
    await notifyFollow(data.followingId, data.followerId);
  }
  return result
}

const unfollowService = async (data) => {
  const result = await unFollowRepo(data)
  return result
}

module.exports = { followService, unfollowService };
