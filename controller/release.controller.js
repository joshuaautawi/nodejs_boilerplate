const client = require("../config/pg.config");
const { Release, ReleaseRecording, Recording } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const release = await Release.create({
        title: req.body.release.title,
        releaseDate: req.body.release.releaseDate,
      });
      await Promise.all(
        req.body.tracks.map(async (track) => {
          await ReleaseRecording.create({
            releaseId: release.id,
            recordingId: track.id,
          });
        })
      );
      return res.status(200).json({ status: "OK", data: release });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  update: async (req, res) => {
    try {
      await Release.update(
        { ...req.body.release },
        { where: { id: req.params.id } }
      );
      await ReleaseRecording.destroy({
        where: {
          releaseId: id,
        },
      });
      await Promise.all(
        req.body.tracks.map(async (track) => {
          await ReleaseRecording.create({
            releaseId: req.params.id,
            recordingId: track.id,
          });
        })
      );
      return res.status(200).json({ status: "OK", message: "updated" });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  deleteOne: async (req, res) => {
    try {
      await Release.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({ status: "OK", message: "delete success" });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;
      const offset = (page - 1) * pageSize;
      const titleFilter = req.query.title;

      let whereCondition = {};
      if (titleFilter) {
        whereCondition.title = { [Sequelize.Op.like]: `%${titleFilter}%` }; // Filtering by title
      }

      const releases = await Release.findAll({
        where: whereCondition,
        limit: pageSize,
        offset: offset,
        include: [
          {
            model: ReleaseRecording,
            as: "releaseRecording",
            include: [
              {
                model: Recording,
                as: "recording",
              },
            ],
          },
        ],
      });

      const totalCount = await Release.count();
      const totalPages = Math.ceil(totalCount / pageSize);

      return res.status(200).json({
        status: "success",
        data: releases,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalCount,
        totalPages: totalPages,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
};
