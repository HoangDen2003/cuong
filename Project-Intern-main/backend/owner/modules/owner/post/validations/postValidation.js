const { BodyWithLocale, ParamWithLocale } = require("kernels/rules");
const db = require("models/index");

const postValidation = {
  index: [
    //other rules goes here
  ],

  search: [
    //
  ],

  getById: [new ParamWithLocale("id").notEmpty().exist(db.Post, "id")],
  
  getByUid: [new ParamWithLocale("uid").notEmpty()],

  getCategory: [
    new ParamWithLocale("id").notEmpty(),
    // new ParamWithLocale("id").notEmpty().exist(db.Post, "category_id"),
  ],

  create: [
    // new BodyWithLocale("title").notEmpty(),
    // new BodyWithLocale("body").notEmpty(),
  ],
  update: [
    new ParamWithLocale("id").notEmpty().exist(db.Post, "id"),
    // new BodyWithLocale("title").notEmpty(),
    // new BodyWithLocale("body").notEmpty(),
    // new BodyWithLocale("user_id").notEmpty().exist(db.User, "id"),
    // new BodyWithLocale("category_id").notEmpty().exist(db.Category, "id"),
    // new BodyWithLocale("language_id").notEmpty().exist(db.Language, "id"),
  ],
  delete: [
    // new BodyWithLocale("ids").isArray().exist(db.Post, "id")
  ],

  updateMultiple: [
    // new BodyWithLocale("ids").isArray().exist(db.Post, "id"),
    // new BodyWithLocale("value").notEmpty(),
    // new BodyWithLocale("type").notEmpty(),
  ],
};

module.exports = postValidation;
