"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.hasMany(models.Recording, {
        foreignKey: "artistId",
        as: "recordings",
      });
    }
  }
  Artist.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      royaltyRate: DataTypes.STRING,
      isPercentage: DataTypes.BOOLEAN,
      contractNum: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artist",
    }
  );
  return Artist;
};
