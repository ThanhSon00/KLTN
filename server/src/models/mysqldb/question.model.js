const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/config');

class Question extends Model {
  toJSON() {
    const question = this;
    return {
      id: question.id,
      title: question.title,
      details: question.details,
      authorId: question.authorId,
      views: question.views,
      createdAt: question.createdAt,
    };
  }
}

Question.init(
  {
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
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelize.connection,
    modelName: 'question',
    hooks: {},
  }
);

module.exports = Question;
