const authService = require("modules/owner/auth/services/authService");
const responseUtils = require("utils/responseUtils");

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
  },

  signUp: async (req, res) => {
    try {
      const newUser = await authService.createUser(req.body);
      return responseUtils.ok(res, newUser);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
  },

  resPass: async (req, res) => {
    const { email, password } = req.body;
    const data = await authService.resetPassword(email, password);
    return responseUtils.ok(res, data);
  },

  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    const data = await authService.refreshToken(refreshToken );
    return responseUtils.ok(res, data);
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const data = await authService.forgotPassword(email);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
  },

  checkOtpMail: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const data = await authService.checkOtpMail(email, otp);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
  },
};

module.exports = authController;
