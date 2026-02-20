const { registerUser, loginUser } = require("./auth.service")

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req?.body)
    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req?.body
    const result = await loginUser(email, password)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login }
