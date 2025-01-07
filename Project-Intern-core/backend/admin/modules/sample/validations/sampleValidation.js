const { BodyWithLocale, QueryWithLocale } = require("kernels/rules");

const sampleValidation = {
  index: [
    new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    //rules
    new BodyWithLocale("email").isEmail(),
  ],
  update: [
    // new QueryWithLocale("title").
  ],
  delete: [],
};

module.exports = sampleValidation;
