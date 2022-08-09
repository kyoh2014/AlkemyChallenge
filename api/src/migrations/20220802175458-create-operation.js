'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      concept: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isAlpha: {
                args: true,
                msg: 'The concept can only contain letters'
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
        type: Sequelize.REAL,
        allowNull: false,
        validate: {
            isNumeric: {
                args: true,
                mgs:'must be a number'
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
      date: {
        type: Sequelize.DATE,
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
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Operations');
  }
};