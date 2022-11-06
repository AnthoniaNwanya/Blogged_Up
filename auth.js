const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtConfig = process.env.TOKEN_KEY;

const useToken = (req, res, next) => {
  const mytoken = req.headers.authorization

  if (!mytoken) {
    return res.status(404).send("Please enter a token");
  }

  const token = mytoken.split(' ')[1]
  try {
    const verifyToken = jwt.verify(token, jwtConfig);
    req.User = verifyToken;
  } catch (err) {
    return res.status(401).send("Invalid token.Please enter a valid token");
  }
  return next();
};

module.exports = { useToken };
