module.exports = function (sequelize, DataTypes) {
  return sequelize.define("book", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    bookAuthor: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    bookType: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
};
