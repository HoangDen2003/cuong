const responseUntils = require("utils/responseUtils");
const languageService = require("modules/language/services/languageService");

module.exports = {
  index: async (req, res) => {
    const { page, limit, search } = req.query;
    const languages = await languageService.list(page, limit, search);
    return responseUntils.ok(res, languages);
  },
  createLanguage: async (req, res) => {
    const language = req.body;
    if (req.file && req.file.filename) {
      language.flag = `http://localhost:3000/${req.file.filename}`;
    }
    const result = await languageService.createLanguage(language);
    return responseUntils.ok(res, result);
  },
  updateLanguage: async (req, res) => {
    const id = req.params;
    const language = req.body;
    if (req.file && req.file.filename) {
      language.flag = `http://localhost:3000/${req.file.filename}`;
    }
    const result = await languageService.updateLanguage(id, language);
    return responseUntils.ok(res, result);
  },
  deleteLanguage: async (req, res) => {
    const { ids } = req.body;
    // const idsArray = id.split(",");
    await languageService.deleteLanguage(ids);
    return responseUntils.ok(res, {
      message: "Languages deleted successfully",
    });
  },
};
