const { Administrator } = require("../models");
const { encrypt, checkEncrypt } = require("../helper/bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    try {
      await Administrator.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          firstName,
          lastName,
          password: encrypt(password),
          email: email,
        },
      });
      return res
        .status(200)
        .json({ status: "success", message: "user has been created !" });
    } catch (e) {
      return res.status(400).json({
        status: "failed",
        message: "Error has been occured !",
        error: e,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Administrator.findOne({
        where: {
          email: email,
        },
      });

      if (checkEncrypt(password, user.password)) {
        delete user.password;
        const token = sign(user.dataValues, process.env.JWT_SECRET);
        return res.status(200).json({ status: "success", token: token });
      } else throw new Error();
    } catch (e) {
      return res.status(400).json({
        status: "failed",
        message: "Error has been occured !",
        error: e,
      });
    }
  },
  showProfile: async (req, res) => {
    try {
      return res.status(200).json({ status: "success", data: req.user });
    } catch (e) {
      return res.status(400).json({
        status: "failed",
        message: "Error has been occured !",
        error: e,
      });
    }
  },
};
