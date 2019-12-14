module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define("Department", {
    // Giving the department model a name of type STRING
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [100]
    }
  });

  Department.associate = function(models) {
    // Associating department with Posts
    // When an department is deleted, also delete any associated Posts
    Department.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };

  return Department;
};
