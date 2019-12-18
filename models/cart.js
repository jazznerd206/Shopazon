module.exports = function (sequelize, DataTypes) {
  var Cart = sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.TEXT,
      isIn: [["addedToCart", "ordered", "saved"]],
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Cart.associate = function (models) {
    //   // We're saying that a Product should belong to an Author
    //   // A Product can't be created without an Author due to the foreign key constraint
    Cart.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }});
    Cart.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false
        }});
    Cart.belongsTo(models.Product, {
          foreignKey: {
            allowNull: false
          }
        });
  };
  return Cart;
};
