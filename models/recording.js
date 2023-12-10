"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Recording belongs to Artist
      Recording.belongsTo(models.Artist, {
        foreignKey: "artistId",
        as: "artist",
      });
      Recording.hasMany(models.ReleaseRecording, {
        foreignKey: "recordingId",
        as: "releaseRecording",
      });
    }
  }
  Recording.init(
    {
      artistId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recording",
    }
  );
  return Recording;
};
