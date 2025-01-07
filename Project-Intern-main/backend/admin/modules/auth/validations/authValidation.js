const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const db = require("models/index");

const options = {
  min: 8,
  max: 16,
};

const sampleValidation = {
  index: [
    new BodyWithLocale("email").notEmpty().isEmail(),
    new BodyWithLocale("password").notEmpty().isLength(options),
  ],
  create: [
    // new BodyWithLocale("username").notEmpty(),
    // new BodyWithLocale("email").notEmpty().isEmail(),
    // new BodyWithLocale("password").notEmpty().isLength(options),
    // new BodyWithLocale("role_id").isNumberic().notEmpty(),
    // new BodyWithLocale("status").isString().notEmpty(),
  ],
  delete: [],
  checkEmail: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
  ],
  checkOTP: [
    new BodyWithLocale("otp").notEmpty().exist(db.Verification, "code"),
  ],
};

module.exports = sampleValidation;
