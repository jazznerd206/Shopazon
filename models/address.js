module.exports = function(sequelize, DataTypes) {
    var address = sequelize.define("Address", {
      // Giving the department model a name of type STRING
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      street1: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1,140]
      },
      street2: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1,140]
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1,140]
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1,140]
      },
      zip: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1,140]
      }


    });
  
    
  
    return address;
  };
  