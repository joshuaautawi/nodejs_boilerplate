const { verify } = require("jsonwebtoken");
const { Administrator } = require("../models");

class JWT {
  static async isLogin(req, res, next) {
    let token;
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res.status(401).json({
          status: "failed",
          message: "Not authorized , please login !",
        });
      const { email } = verify(token, process.env.JWT_SECRET);
      const user = await Administrator.findOne({
        where: {
          email: email,
        },
      });
      req.user = { id: user.id, username: user.username, email: user.email };
      if (req.user) return next();
      else throw new Error();
    } catch (e) {
      return res
        .status(400)
        .json({ status: "failed", message: "Error has occured", error: e });
    }
  }
}

module.exports = JWT;
