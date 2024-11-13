var express = require("express");
var router = express.Router();

const {
  isClientFormInfoRegistered,
  isClientFormAchievements,
  isClientFormExperience,
  isClientVideo,
  isClientPhoto,
  isInversorInfo,
  isInversorPhoto,
  getFeatured,
  uploadimageUserCloudinaryHome,
  getAllImageHome
} = require("../controllers/utilities");

router.get("/informacion", isClientFormInfoRegistered);
router.get("/logros", isClientFormAchievements);
router.get("/experiencia", isClientFormExperience);
router.get("/video", isClientVideo);
router.get("/imagen", isClientPhoto);
router.get("/informacionInversionista", isInversorInfo);
router.get("/isInversorPhoto", isInversorPhoto);
router.get("/getFeatured", getFeatured);
router.post("/uploadimageUserCloudinaryHome/:fieldImage", uploadimageUserCloudinaryHome);
router.get("/getAllImageHome/", getAllImageHome);

module.exports = router;
