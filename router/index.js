const router = require("express").Router();
const adminRoute = require("./admin.route");
const artistRoute = require("./artist.route");
const recordingRoute = require("./recording.route");
const releaseRoute = require("./release.route");

router.get("/", (req, res) => {
  res.status(200).json({ data: "Home Page", message: "Success" });
});

const adminPath = "/admins";
router.use(adminPath, adminRoute);

const artistPath = "/artists";
router.use(artistPath, artistRoute);

const recordingPath = "/recordings";
router.use(recordingPath, recordingRoute);

const releasePath = "/releases";
router.use(releasePath, releaseRoute);

module.exports = router;
