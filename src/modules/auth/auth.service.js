const bcrypt = require("bcrypt")
const { createUser, findUserByEmail } = require("./auth.repository")
const { generateToken } = require("../../utils/jwt")

const registerUser = async (userData) => {
  const { username, email, password } = userData

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await createUser({
    username,
    email,
    password: hashedPassword,
  })

  const token = generateToken(user.id)

  return { user, token }
}

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error("User does not exist with this email")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Invalid Credentials")
  }

  const token = generateToken(user.id)

  return { user, token }
}

module.exports = { registerUser, loginUser }
