const jwt = require("jsonwebtoken");
const secret = "mysecretkey";

function setUser(user) {
  const { _id, name, email } = user;
  return jwt.sign({ _id, name, email }, secret);
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return null;
    }
    throw error;
  }
}

module.exports = {
  setUser,
  getUser,
};
