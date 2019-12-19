module.exports = function (sequelize, DataTypes) {
  var Address = sequelize.define("Address", {
    // Giving the department model a name of type STRING
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street1: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 140]
    },
    street2: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 140]
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 140]
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 140]
    },
    zip: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1, 140]
    }
  });
  Address.associate = function (models) {
    // Associating department with Posts
    // When an department is deleted, also delete any associated Posts
    Address.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Address;
};
