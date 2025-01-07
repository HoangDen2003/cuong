const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  login: async (req, res) => {
    // const options = {
    //   httpOnly: false,
    //   secure: false, // Đặt true nếu sử dụng HTTPS
    //   sameSite: "Strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    // };

    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);

      // if (checked) {
      //   res.cookie("e", email, options);
      //   res.cookie("p", password, options);
      // }

      // console.log("==>", req.cookies);

      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
    // const { email, password } = req.body;
    // const data = await authService.login(email, password);
    // return responseUtils.ok(res, data);
  },
  forgotPassword: async (req, res) => {
    const rusult = await authService.forgotPassword(req.body);
    return responseUtils.ok(res, rusult);
  },
  sendMail: async (req, res) => {
    const result = await authService.sendMail(req.body);
    return responseUtils.ok(res, result);
  },
  verifyEmail: async (req, res) => {
    const { otp } = req.body;
    const result = await authService.verifyEmail(otp);
    return responseUtils.ok(res, result);
  },
  deleteOtp: async (req, res) => {
    const result = await authService.deleteOtp(req.body.otp);
  },
  newPassword: async (req, res) => {
    const result = await authService.newPassword(req.body);
    return responseUtils.ok(res, result);
  },
};
