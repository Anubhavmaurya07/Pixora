const JWT = require("jsonwebtoken")
const { findUserById } = require("../modules/auth/auth.repository")
const ApiError = require("../utils/ApiError")

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized request"))
    }

    const token = authHeader.split(" ")[1]

    const decodedToken = JWT.verify(token, process.env.JWT_SECRET)

    const user = await findUserById(decodedToken.userId)

    if (!user) {
      return next(new ApiError(401, "User not found"))
    }

    req.user = user
    next()

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "JWT expired"))
    }

    return next(new ApiError(401, "Invalid token"))
  }
}

module.exports = { verifyJWT }
