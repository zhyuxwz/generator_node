module.exports = function (sequelize, DataTypes) {
  return sequelize.define("page", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    picUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pageIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
};
