const responseUtils = require("utils/responseUtils");
const userService = require("modules/user/services/userService");

module.exports = {
  // todo: get all user
  index: async (req, res) => {
    const { page, limit, search } = req.query;
    const result = await userService.list(page, limit, search);
    return responseUtils.ok(res, result);
  },
  // todo: create a user
  createUser: async (req, res) => {
    const user = req.body;
    if (req.file && req.file.filename)
      user.avatar = `http://localhost:3000/${req.file.filename}`;
    const newUser = await userService.createUser(user);
    return responseUtils.ok(res, newUser);
  },
  // todo: delete a user
  deleteUser: async (req, res) => {
    const { ids } = req.body;
    await userService.deleteUser(ids);
    return responseUtils.ok(res, { Delete: "Successfull" });
  },
  updateUser: async (req, res) => {
    const userId = req.params;
    const user = req.body;
    if (req.file && req.file.filename) {
      user.avatar = `http://localhost:3000/${req.file.filename}`;
    }
    await userService.updateUser(userId, user);
    return responseUtils.ok(res, { user: "Update successfull" });
  },
  getUser: async (req, res) => {
    const { id } = req.query;
    const user = await userService.getUser(id);
    return responseUtils.ok(res, user);
  },
};
