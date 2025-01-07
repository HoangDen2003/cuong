const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");
const db = require("models/index");

const categoryValidation = {
  index: [new QueryWithLocale("search").notEmpty()],
  create: [
    new BodyWithLocale("name")
      .notEmpty()
      .isString()
      .unique(db.Category, "name"),
  ],
  delete: [
    // new BodyWithLocale("id").notEmpty().exist(db.Category, "id")
  ],
  update: [
    // new ParamWithLocale("id").exist(db.Category, "id"),
    new BodyWithLocale("name").notEmpty().isString(),
    // new BodyWithLocale("slug").notEmpty().isString(),
  ],
};

module.exports = categoryValidation;
