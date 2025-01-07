const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const db = require("models/index");

const languageValidation = {
  index: [],
  create: [
    new BodyWithLocale("name")
      .notEmpty()
      .isString()
      .unique(db.Language, "name"),
    new BodyWithLocale("locale")
      .notEmpty()
      .isString()
      .unique(db.Language, "locale"),
  ],
  delete: [],
  update: [
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("locale").notEmpty().isString(),
  ],
};

module.exports = languageValidation;
