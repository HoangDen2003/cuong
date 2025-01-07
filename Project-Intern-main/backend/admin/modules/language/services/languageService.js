const db = require("models/index");
const { Op, Sequelize } = require("sequelize");
const { debounce } = require("modules/kernels/debounce");

const debounceList = debounce((languages) => {
  return languages;
}, 500);

module.exports = {
  list: async (page, limit, search) => {
    let languages;
    if (search && search !== "") {
      const valueLowCase = search.toLowerCase();
      languages = await db.Language.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
      languages = await debounceList(languages);
    } else {
      languages = await db.Language.findAll({});
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pages = Math.ceil(languages.length / limit);
    const result = languages.slice(startIndex, endIndex);
    return { result, pages };
  },
  createLanguage: async (lg) => {
    const language = await db.Language.create(lg);
    return language;
  },
  updateLanguage: async (id, lg) => {
    const language = await db.Language.update(lg, { where: id });
    return language;
  },
  deleteLanguage: async (ids) => {
    await db.Language.destroy({ where: { id: ids } });
  },
};
