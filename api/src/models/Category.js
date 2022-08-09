'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Operation, {
        foreignKey: 'idCategory'
      })
    }
  }
  Category.init({
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    deletedAt: {
      allownull: true,
      type: DataTypes.DATE
    }
    }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};