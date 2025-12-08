const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

// sequelize orm
class Kehadiran extends Model {}

Kehadiran.init(
  {
    users_nip: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("in", "out"),
    },
  },
  {
    sequelize,
    modelName: "Kehadiran",
  }
);

module.exports = Kehadiran;
