const router = require("express").Router();
const {
  create,
  update,
  getAll,
  deleteOne,
} = require("../controller/recording.controller");

const path = "/";
router.post(path, create);
router.get(path, getAll);
router.put("/:id", update);
router.delete("/:id", deleteOne);

module.exports = router;
