const jwt = require("configs/jwt");
const JWT = require("jsonwebtoken");
const responseUtils = require("utils/responseUtils");

module.exports = {
  auth: async (req, res, next) => {
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
  },
  admin: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      return responseUtils.unauthorized(res);
    }
    const authTokenHeaders = req.headers["authorization"];
    const token = authTokenHeaders.split(" ")[1];
    JWT.verify(token, jwt.secret, (error, user) => {
      if (error) {
        return responseUtils.unauthorized(res);
      }
      if (user.role == "admin") {
        req.user = user;
        next();
      } else {
        return responseUtils.unauthorized(res, "You aren't an admin");
      }
    });
  },
  user: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      return responseUtils.unauthorized(res);
    }
    const authTokenHeaders = req.headers["authorization"];
    const token = authTokenHeaders.split(" ")[1];
    JWT.verify(token, jwt.secret, (error, user) => {
      if (error) {
        return responseUtils.unauthorized(res);
      }
      if (user.role == "user") {
        req.user = user;
        next();
      } else {
        return responseUtils.unauthorized(res);
      }
    });
  },
};
