const db = require("models/index");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { debounce } = require("modules/kernels/debounce");

const debounceList = debounce((users) => {
  return users;
}, 500);

module.exports = {
  // todo: selet * from users
  list: async (page, limit, search) => {
    // console.log("id: ", id);
    // const debounceSearch = debounce(search, 2000);
    // console.log(debounceSearch);
    let users;
    if (search && search != "") {
      const valueLowCase = search.toLowerCase();
      users = await db.User.findAll({
        include: {
          model: db.Role,
          as: "role",
          attributes: ["id", "name"],
        },
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(username, email, phone) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
      users = await debounceList(users);
    } else {
      users = await db.User.findAll({
        include: { model: db.Role, as: "role", attributes: ["id", "name"] },
      });
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pages = Math.ceil(users.length / limit);
    const result = users.slice(startIndex, endIndex);

    if (result) return { result, pages };
    else throw new Error("Failed");
  },
  // todo: insert into user values(...)
  createUser: async (user) => {
    const hashPW = await bcrypt.hash(user.password, 10);
    user.password = hashPW;
    const users = await db.User.create(user);
    return users;
  },
  // todo: delete from users where id = userId
  deleteUser: async (ids) => {
    await db.User.destroy({ where: { id: ids } });
    return { message: "Users deleted successfully" };
  },
  updateUser: async (userId, user) => {
    const hashPW = await bcrypt.hash(user.password, 10);
    user.password = hashPW;

    const result = await db.User.update(user, {
      where: userId,
    });
    return result;
  },
  getUser: async (id) => {
    const result = await db.User.findOne({
      include: { model: db.Role, as: "role", attributes: ["id", "name"] },
      where: { id: id },
    });
    return result;
  },
};
