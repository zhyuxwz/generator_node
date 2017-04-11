module.exports = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    openId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    avatarUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    unionId: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  })
};
