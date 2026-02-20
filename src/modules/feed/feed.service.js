const { decode, encode } = require("../../utils/cursor");
const { getFollowingIds, getFeedPosts } = require("./feed.repository")

const getUserFeed = async (userId, token, limit) => {
    // Step 1: Get all userIds to include in feed (self + following)
    const followingIds = await getFollowingIds(userId);

    // If user follows no one and has no posts, return early
    if (followingIds.length === 0) {
        const ownPosts = await getFeedPosts({ feedUserIds: [userId], cursor: token ? decode(token) : null, limit });

        if (ownPosts.length === 0) {
            return {
                posts: [],
                nextCursor: null,
                message: "No posts yet. Follow users or create your first post!"
            };
        }

        let nextCursor = null;
        if (ownPosts.length > limit) {
            const last = ownPosts.pop();
            nextCursor = encode({
                createdAt: last.createdAt.toISOString(),
                id: last.id
            });
        }

        return { posts: ownPosts, nextCursor };
    }

    const feedUserIds = [...new Set([...followingIds, userId])];

    // Step 2: Decode cursor (if exists)
    let cursor = null;
    if (token) {
        cursor = decode(token);
    };

    // Step 3: Fetch posts
    const posts = await getFeedPosts({ feedUserIds, cursor, limit });

    // Step 4: Generate nextCursor if there are more posts
    let nextCursor = null;
    if (posts?.length > limit) {
        const last = posts[limit - 1];
        nextCursor = encode({
            createdAt: last.createdAt.toISOString(),
            id: last.id
        });
        posts.splice(limit); 
    }

    // Step 5: Return formatted feed
    return { posts, nextCursor };
}

module.exports = { getUserFeed };