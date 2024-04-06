const { QueryInterface, DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      await db.createTable('questions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        details: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        authorId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        views: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      await db.dropTable('questions');
    }
  },
};
