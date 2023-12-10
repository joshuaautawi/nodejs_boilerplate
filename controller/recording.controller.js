const { Recording, Artist } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const recording = await Recording.create({
        ...req.body,
      });
      return res.status(200).json({ status: "OK", data: recording });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  update: async (req, res) => {
    try {
      const recording = await Recording.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );
      if (!recording[0])
        return res.status(400).json({
          status: "failed",
          message: "Bad Requst!",
        });
      return res.status(200).json({ status: "OK", message: "updated" });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  deleteOne: async (req, res) => {
    try {
      await Recording.destroy({
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
      const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not specified
      const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not specified
      const offset = (page - 1) * limit;

      const { count, rows } = await Recording.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [{ model: Artist, as: "artist" }],
      });
      return res.status(200).json({
        status: "success",
        data: rows,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
};
