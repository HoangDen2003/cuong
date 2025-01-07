const db = require("models/index");

const siteService = {
  getCategory: async () => {
    const categories = await db.Category.findAll();
    return categories;
  },

  getLanguage: async () => {
    const languages = await db.Language.findAll();
    return languages;
  },

  getUserById: async (uid) => {
    const user = await db.User.findByPk(uid);
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        phone: user.phone,
        address: user.address,
        role: role.name,
      },
    };
  },

  updateUser: async (uid, updateUser) => {
    const user = await db.User.findByPk(uid);
    await user.update(updateUser);
    return user;
  },
};

module.exports = siteService;
