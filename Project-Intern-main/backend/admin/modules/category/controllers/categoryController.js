const responseUntils = require("utils/responseUtils");
const categoryService = require("modules/category/services/categoryService");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const { page, limit, search } = req.query;
    const categories = await categoryService.list(page, limit, search);
    return responseUntils.ok(res, categories);
  },
  createCategory: async (req, res) => {
    const category = req.body;
    // creating slug
    category.slug = slugify(category.name, {
      lower: true, // convert to lower case
      strict: true, // remove special characters
    });
    const result = await categoryService.createCategory(category);
    return responseUntils.ok(res, { category: result });
  },
  updateCategory: async (req, res) => {
    const id = req.params;
    const category = req.body;
    const result = await categoryService.updateCategory(id, category);
    return responseUntils.ok(res, { category: result });
  },
  deleteCategory: async (req, res) => {
    const { ids } = req.body;
    await categoryService.deleteCategory(ids);
    return responseUntils.ok(res, {
      message: "Categories deleted successfully",
    });
  },
};
