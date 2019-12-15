module.exports = function(sequelize, DataTypes) {
    var cart = sequelize.define("Cart", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cart_custId: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1,140]
      },
      status: {
        type: DataTypes.TEXT,
        isIn:[["addedToCart","ordered","saved"]],
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cart_orderId: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cart_prodId: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    // Cart.associate = function(models) {
    //   // We're saying that a Product should belong to an Author
    //   // A Product can't be created without an Author due to the foreign key constraint
    //   Cart.belongsTo(models.Department, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
    return cart;
  };
  