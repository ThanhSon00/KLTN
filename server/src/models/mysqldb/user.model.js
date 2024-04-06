const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../../config/config');

class User extends Model {
  static async isEmailTaken(email) {
    const user = await this.findOne({ where: { email } });
    return !!user;
  }

  static async isNameTaken(name) {
    const user = await this.findOne({ where: { name } });
    return !!user;
  }

  isPasswordMatch(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }

  toJSON() {
    const user = this;
    delete user.password;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
    };
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/non-avatar.jpg',
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelize.connection,
    modelName: 'user',
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const password = user.get('password');
          const hashPassword = await bcrypt.hash(password, 8);
          user.setDataValue('password', hashPassword);
        }
      },
    },
  }
);

module.exports = User;
