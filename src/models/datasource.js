"use strict";

module.exports = function(sequelize, DataTypes) {
  var Datasource = sequelize.define("Datasource", {
    name: DataTypes.STRING,
    key: DataTypes.STRING,
	interval_update: DataTypes.INTEGER,
	user_id: DataTypes.STRING
  }
  , {
  //   classMethods: {
  //     associate: function(models) {
  //       Task.belongsTo(models.User, {
  //         onDelete: "CASCADE",
  //         foreignKey: {
  //           allowNull: false
  //         }
  //       });
  //     }
  //   }
  });

  return Datasource;
};

