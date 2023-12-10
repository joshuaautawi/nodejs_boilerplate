const { Artist } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const artist = await Artist.create({
        ...req.body,
      });
      return res.status(200).json({ status: "OK", data: artist });
    } catch (e) {
      return res
        .status(500)
        .json({ status: "failed", message: JSON.stringify(e) });
    }
  },
  update: async (req, res) => {
    try {
      const artist = await Artist.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );
      if (!artist[0])
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
      await Artist.destroy({
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Artist.findAndCountAll({
        limit,
        offset,
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
