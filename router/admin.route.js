const router = require("express").Router();
const {
  register,
  login,
  showProfile,
} = require("../controller/admin.controller");
const { isLogin } = require("../middleware/auth");

router.get("/", isLogin, showProfile);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
