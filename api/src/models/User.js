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
      // define association here
      User.hasMany(models.Operation, {
        foreignKey: 'idUser'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Name cannot be null'
        },
        isAlpha: {
            args: true,
            msg: 'Can only contain letters'
        },
        len: {
            args: [3,255],
            msg: 'must be between 3 and 255 characters'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Lastname cannot be null'
        },
        isAlpha: {
            args: true,
            msg: 'Can only contain letters'
        },
        len: {
            args: [3,255],
            msg: 'must be between 3 and 255 characters'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Password cannot be null'
        }
      }
    },
    username: { type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Username cannot be null'
        },
        len: {
            args: [3,255],
            msg: 'must be between 3 and 255 characters'
        }
      }
    },
    email: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
            args: true,
            msg: 'must be a valid email'
        },
        notNull: {
            msg: 'Email cannot be null'
        },
        len: {
            args: [3,255],
            msg: 'must be between 3 and 255 characters'
        }
      }
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};