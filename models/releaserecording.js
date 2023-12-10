"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReleaseRecording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReleaseRecording.belongsTo(models.Release, {
        foreignKey: "releaseId",
        as: "release",
      });

      ReleaseRecording.belongsTo(models.Recording, {
        foreignKey: "recordingId",
        as: "recording",
      });
    }
  }
  ReleaseRecording.init(
    {
      releaseId: DataTypes.INTEGER,
      recordingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReleaseRecording",
    }
  );
  return ReleaseRecording;
};
