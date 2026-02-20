const { getUserFeed } = require("./feed.service");

const getFeedController = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const { cursor, limit } = req?.query;
        // this will make sure that limit is number and value between 5 to 50;
        const parsedLimit = Math.min(50, Math.max(5, Number(limit) || 10));

        const result = await getUserFeed(userId, cursor || null, parsedLimit);
        res.status(200).json({
            success: true,
            posts: result.posts,
            nextCursor: result.nextCursor,
            message: result.message || null,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { getFeedController };