'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    otp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};