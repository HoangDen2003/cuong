const postService = require("modules/owner/post/services/postService");
const responseUtils = require("utils/responseUtils");
const slugify = require("slugify");

const postController = {
  // Get post list
  index: async (req, res) => {
    const { languageId } = req.query;
    const posts = await postService.list(languageId);
    return responseUtils.ok(res, posts);
  },

  getCategory: async (req, res) => {
    const { page = 1, perPage = 10 } = req.query;
    const { id } = req.params;
    const { languageId } = req.query;
    const category = await postService.category(id, parseInt(page), parseInt(perPage), languageId);
    return responseUtils.ok(res, category);
  },

  // Get post by ID
  getById: async (req, res) => {
    const { id } = req.params;
    const { languageId } = req.query;
    const post = await postService.getById(id, languageId);
    return responseUtils.ok(res, post);
  },

  getByUid: async (req, res) => {
    try {
      const { uid } = req.params;
      const { keyword, categoryId, status, page = 1, perPage = 10 } = req.query;
      const posts = await postService.getByUid(uid, keyword, categoryId, status, parseInt(page), parseInt(perPage));
      return responseUtils.ok(res, posts);
    } catch (error) {
      return responseUtils.error(res, error);
    }
  },

  // Create new post
  create: async (req, res) => {
    try {
      const { formData } = req.body;
      const { translations } = req.body.formData;
      const title = translations[0].title || translations[1].title || translations[2].title;
      
      if (!title) return responseUtils.notFound(res, "Post title is required.");

      formData.slug = slugify(title, {
        lower: true,
        strict: true
      });
      const newPost = await postService.create(formData, translations);
      return responseUtils.ok(res, newPost);
    } catch (error) {
      return responseUtils.error(res, "Failed to create post.");
    }
  },

  // Update post
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const { formData } = req.body;
      const { translations } = req.body.formData;
      const updatedPost = await postService.update(id, formData, translations);
      return responseUtils.ok(res, updatedPost);
    } catch (error) {
      return responseUtils.error(res, "Failed to update post.");
    }
  },

  // Delete post
  delete: async (req, res) => {
    const idsPost = req.body.formData.Ids;
    try {
      await postService.delete(idsPost);
      return responseUtils.ok(res, { message: "Posts deleted successfully" });
    } catch (error) {
      return responseUtils.error(res, "Failed to delete posts.");
    }
  },

  updateMultiple: async (req, res) => {
    const { Ids, value, type } = req.body.formData;
    const updatedPostData = {
      value: value,
      type: type,
    };
    const updatedPosts = await postService.updateMultiple(Ids, updatedPostData);
    return responseUtils.ok(res, updatedPosts);
  },

};

module.exports = postController;
