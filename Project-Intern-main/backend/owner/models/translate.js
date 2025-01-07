'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Translate.belongsTo(models.Post, { foreignKey: 'post_id', targetKey: 'id' });
      Translate.belongsTo(models.Language, { foreignKey: 'language_id', targetKey: 'id', as: 'language' });    }
  }
  Translate.init({
    post_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Translate',
  });
  return Translate;
};