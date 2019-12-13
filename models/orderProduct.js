module.exports = function(sequelize, DataTypes) {
  var OrderProduct = sequelize.define("OrderProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  //     //   OrderProduct.associate = function(models) {
  //     //     // We're saying that a OrderProduct should belong to an product
  //     //     // A Product can't be created without an product due to the foreign key constraint
  //     //     OrderProduct.belongsTo(models.Product, {
  //     //       foreignKey: {
  //     //         allowNull: false
  //     //       }
  //     //     });
  //     //   };
  return OrderProduct;
};
