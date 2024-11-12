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
  getFeatured
} = require("../controllers/utilities");

router.get("/informacion", isClientFormInfoRegistered);
router.get("/logros", isClientFormAchievements);
router.get("/experiencia", isClientFormExperience);
router.get("/video", isClientVideo);
router.get("/imagen", isClientPhoto);
router.get("/informacionInversionista", isInversorInfo);
router.get("/isInversorPhoto", isInversorPhoto);
router.get("/getFeatured", getFeatured);

module.exports = router;
