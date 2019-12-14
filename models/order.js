module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    // Giving the order model a name of type STRING
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Order;
};
