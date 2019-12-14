module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      // Giving the order model a name of type STRING
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_addressId:{
          type:DataTypes.INTEGER,

      },     
     order_custId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    return Order;
  };
  