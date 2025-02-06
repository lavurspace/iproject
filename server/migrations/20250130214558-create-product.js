'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Name cannot be empty'
          },
          notNull: {
            msg: 'Name cannot be empty'
          }
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Description cannot be empty'
          },
          notNull: {
            msg: 'Description cannot be empty'
          }
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Price cannot be empty'
          },
          notNull: {
            msg: 'Price cannot be empty'
          }
        }
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Stock cannot be empty'
          },
          notNull: {
            msg: 'Stock cannot be empty'
          }
        }
      },
      rating: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Image cannot be empty'
          },
          notNull: {
            msg: 'Image cannot be empty'
          }
        }
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
    await queryInterface.dropTable('Products');
  }
};