const { config } = require("configs");
const jwt = require("jsonwebtoken");

module.exports = {
  sign: (userId, userRole) => {
    const access_token = jwt.sign(
      {
        userId: userId,
        role: userRole,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.ttl,
      }
    );

    return access_token;
  },
};
