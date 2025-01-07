const { BodyWithLocale, ParamWithLocale } = require("kernels/rules");
const db = require("models/index");

const authValidation = {
  signIn: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
    new BodyWithLocale("password").notEmpty(),
  ],

  signUp: [
    new BodyWithLocale("username").notEmpty(),
    new BodyWithLocale("email").notEmpty().isEmail().unique(db.User, "email"),
    new BodyWithLocale("password").isLength({ min: 5 }),
    new BodyWithLocale("confirmPassword").notEmpty().confirmed("password"),
    // new BodyWithLocale("role_id").notEmpty(),
  ],

  resPass: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
    new BodyWithLocale("password").isLength({ min: 6 }),
    new BodyWithLocale("confirmPassword").notEmpty().confirmed("password"),
  ],

  forgotPassword: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
  ],

  checkOtpMail: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
    new BodyWithLocale("otp").notEmpty(),
  ],
};

module.exports = authValidation;
