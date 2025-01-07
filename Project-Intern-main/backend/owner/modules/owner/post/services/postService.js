const db = require("models/index");
const { Op, Sequelize, where } = require("sequelize");

const postService = {
  list: async (languageId) => {
    const languageInclude = {
      model: db.Translate, as: 'translations', attributes: ['id', 'language_id', 'title', 'body'],
      include: [
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] },
      ],
    };
  
    if (languageId) { languageInclude.where = { language_id: languageId }; }
  
    const posts = await db.Post.findAll({
      where: { status: 'true' },
      include: [ 
        { model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        languageInclude,
      ],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  },

  getById: async (id, languageId) => {
    const languageInclude = {
      model: db.Translate, as: 'translations', attributes: ['id', 'language_id', 'title', 'body'],
      include: [
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] },
      ],
    };
  
    if (languageId) { languageInclude.where = { language_id: languageId }; }
  
    const post = await db.Post.findByPk(id, {
      include: [ 
        { model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        { model: db.User, as: 'user', attributes: ['id', 'username'] },
        languageInclude,
      ],
      order: [['createdAt', 'DESC']],
    });
    return post;
  },

  getByUid: async (uid , keyword, categoryId, status, page, perPage) => {
    const whereClause = { 
      user_id: uid,
      ...(categoryId && { category_id: categoryId }),
      ...(status && { status: status })
    };

    const offset = (page - 1) * perPage;
    const count = await db.Post.count({
      where: whereClause,
      distinct: true,
      include: [
        { model: db.Translate, as: 'translations', attributes: [],
          where: keyword ? Sequelize.literal(`MATCH(title, body) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`) : undefined
        }
      ]
    });

    const includeArray = [
      { model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] },
      { model: db.Translate, as: 'translations', attributes: ['id', 'language_id', 'title', 'body'],
        include: [{ model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }]
      }
    ];
    
    if(keyword) includeArray[1].where = Sequelize.literal(`MATCH(title, body) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`);

    const posts = await db.Post.findAll({
        where: whereClause,
        include: includeArray,
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: perPage
    });

    const totalPages = Math.ceil(count / perPage);
    return {
      posts: posts,
      limit: perPage,
      offset: offset,
      totalPosts: count,
      totalPages: totalPages
    };
},

category: async (id, page, perPage, languageId) => {
  const offset = (page - 1) * perPage;
  const baseIncludes = [
    { model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] },
    { model: db.User, as: 'user', attributes: ['id', 'username'] },
  ];

  const translationsInclude = {
    model: db.Translate, as: 'translations', attributes: ['id', 'language_id', 'title', 'body'],
    include: [
      { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] },
    ],
  };

  if (languageId) {
    translationsInclude.where = { language_id: languageId };
  }

  const includeOptions = [
    ...baseIncludes,
    translationsInclude,
  ];

  const { count, rows: posts } = await db.Post.findAndCountAll({
    where: { category_id: id, status: 'true' },
    distinct: true,
    include: includeOptions,
    order: [['createdAt', 'DESC']],
    offset: offset,
    limit: perPage,
  });

  const totalPages = Math.ceil(count / perPage);

  return {
    posts: posts,
    limit: perPage,
    offset: offset,
    totalPosts: count,
    totalPages: totalPages,
  };
},

  create: async (formData, translations) => {
    const newPost = await db.Post.create(formData);
    if (translations) {
      for (const translation of translations) {
        translation.post_id = newPost.id;
        await db.Translate.create(translation);
      }
    }
    return newPost;
  },

  update: async (id, formData, translations) => {
    const post = await db.Post.findByPk(id);
    await post.update(formData);
    if (translations && translations.length > 0) {
      for (const translation of translations) {
        const [translate, created] = await db.Translate.findOrCreate({
          where: { post_id: id, language_id: translation.language_id },
          defaults: translation
        });
        if (!created) {
          await translate.update(translation);
        }
      }
    }
    return post;
  },

  delete: async (idsPost) => {
    const posts = await db.Post.findAll({ where: { id: idsPost } });
  if (posts.length !== idsPost.length) {
    throw new Error("One or more posts not found");
  }
    await db.Translate.destroy({ where: { post_id: idsPost } });
    await db.Post.destroy({ where: { id: idsPost } });
    return { message: "Post and related translations deleted successfully" };
  },
  

  updateMultiple: async (Ids, updatedPostData) => {
    const posts = await db.Post.findAll({ where: { id: Ids } });
    const updatedPosts = [];
    for (const post of posts) {
      const updateData = { [updatedPostData.type]: updatedPostData.value };
      await post.update(updateData);
      updatedPosts.push(post);
    }
    return updatedPosts;
  },
};

module.exports = postService;
