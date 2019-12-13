module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  Product.associate = function(models) {
    // We're saying that a Product should belong to an Author
    // A Product can't be created without an Author due to the foreign key constraint
    Product.belongsTo(models.Department, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Product;
};
