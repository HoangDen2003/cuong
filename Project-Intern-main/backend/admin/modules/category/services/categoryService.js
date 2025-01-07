const db = require("models/index");
const { Op, Sequelize } = require("sequelize");
const { debounce } = require("modules/kernels/debounce");

const debounceList = debounce((categories) => {
  return categories;
}, 500);

module.exports = {
  list: async (page, limit, search) => {
    let categories;
    if (search && search !== "") {
      const valueLowCase = search.toLowerCase();
      categories = await db.Category.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
      categories = await debounceList(categories);
    } else {
      categories = await db.Category.findAll({});
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pages = Math.ceil(categories.length / limit);
    const result = categories.slice(startIndex, endIndex);

    return { result, pages };
  },
  createCategory: async (ctg) => {
    const category = await db.Category.create(ctg);
    return category;
  },
  updateCategory: async (id, ctg) => {
    const category = await db.Category.update(ctg, { where: id });
    return category;
  },
  deleteCategory: async (ids) => {
    await db.Category.destroy({ where: { id: ids } });
  },
};
