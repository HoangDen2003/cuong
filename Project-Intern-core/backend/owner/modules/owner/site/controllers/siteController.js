const siteService = require("modules/owner/site/services/siteService");
const responseUtils = require("utils/responseUtils");

const siteController = {
  getCategory: async (req, res) => {
    const data = await siteService.getCategory();
    return responseUtils.ok(res, data);
  },

  getLanguage: async (req, res) => {
    const data = await siteService.getLanguage();
    return responseUtils.ok(res, data);
  },

  getUserById: async (req, res) => {
    const { uid } = req.params;
    const user = await siteService.getUserById(uid);
    return responseUtils.ok(res, user);
  },

  updateUser: async (req, res) => {
    const { uid } = req.params;
    const updateUser = req.body.formData;
    await siteService.updateUser(uid, updateUser);
    return responseUtils.ok(res, { user: "Update successfull" });
  },
};

module.exports = siteController;
