module.exports = function (sequelize, DataTypes) {
  return sequelize.define("order", {
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
    orderNum: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    paid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tradeNum: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  })
};
