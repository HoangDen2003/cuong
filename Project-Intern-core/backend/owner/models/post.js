'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Language, { foreignKey: 'language_id', as: 'language' });
      Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Post.hasMany(models.Translate, { foreignKey: 'post_id', as: 'translations' });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    file: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};