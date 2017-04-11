module.exports = function (sequelize, DataTypes) {
  return sequelize.define("smsRecordModel", {
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
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  })
};
