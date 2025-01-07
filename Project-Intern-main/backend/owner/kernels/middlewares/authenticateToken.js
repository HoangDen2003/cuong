const jwt = require("configs/jwt");
const JWT = require("jsonwebtoken");
const responseUtils = require("utils/responseUtils");

const authenticateToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return responseUtils.unauthorized(res);
  }
  const authTokenHeaders = req.headers["authorization"];
  const token = authTokenHeaders.split(" ")[1];
  JWT.verify(token, jwt.secret, (error, user) => {
    if (error) {
      return responseUtils.unauthorized(res);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
