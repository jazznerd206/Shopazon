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
  Product.associate = function(models) {
    // We're saying that a Product should belong to an Author
    // A Product can't be created without an Author due to the foreign key constraint
    Product.belongsTo(models.Department.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return OrderProduct;
};
