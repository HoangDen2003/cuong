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

const optionsKeySearch = {
  min: 3,
};

const optionsPhone = {
  min: 9,
};

const userValidation = {
  index: [],
  create: [
    new BodyWithLocale("username")
      .notEmpty()
      .isString()
      .unique(db.User, "username"),
    new BodyWithLocale("email")
      .isEmail()
      .notEmpty()
      .isString()
      .unique(db.User, "email"),
    new BodyWithLocale("phone")
      .notEmpty()
      .isString()
      .isLength(optionsPhone)
      .unique(db.User, "phone"),
    // new BodyWithLocale("password").notEmpty().isString().isLength(options),
    // new BodyWithLocale("role_id").notEmpty().isNumberic(),
    // new BodyWithLocale("status").isString(),
  ],
  delete: [
    // new BodyWithLocale("ids").notEmpty()
  ],
  update: [
    // new ParamWithLocale("id").notEmpty().exist(db.User, "id"),
    new BodyWithLocale("username").notEmpty().isString(),
    new BodyWithLocale("email").notEmpty().isString().isEmail(),
    new BodyWithLocale("phone").notEmpty().isString().isLength(optionsPhone),
    new BodyWithLocale("password").notEmpty().isLength(options).isString(),
    new BodyWithLocale("role_id").notEmpty(),
    new BodyWithLocale("status").notEmpty().isString(),
  ],
};

module.exports = userValidation;
