const sampleService = require("modules/sample/services/sampleService");
const responseUtils = require("utils/responseUtils");

const sampleController = {
  index: (req, res) => {
    const result = sampleService.list();
    return responseUtils.ok(res, {
      a: result,
    });
  },

  validate: (req, res) => {
    console.log(res.data);
    const result = sampleService.list();
    return responseUtils.ok(res, {
      a: result,
    });
  },
};

module.exports = sampleController;
