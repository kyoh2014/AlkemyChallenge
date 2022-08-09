'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Operation.belongsTo(models.User, {
        foreignKey: 'idUser'
      })
      Operation.belongsTo(models.Category, {
        foreignKey: 'idCategory'
      })
    }
  }
  Operation.init({
    concept: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          isAlpha: {
              args: true,
              msg: 'Can only contain letters'
          },
          notNull: {
              msg: 'Cannot be null'
          },
          len: {
              args: [3,255],
              msg: 'must be between 3 and 255 characters'
          }
      }
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
          isNumeric: {
              args: true,
              mgs:'must be a number'
          },

          notNull: {
              msg: 'Cannot be null'
          }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
          isDate: {
              args: true,
              msg: 'must be a valid date'
          },
          notNull: {
              msg: 'Cannot be null'
          }
      }
    },
    type: {
      type: DataTypes.STRING
    },
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model:'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    idCategory: {
      type: DataTypes.INTEGER,
      references: {
        model:'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Operation',
  });
  return Operation;
};