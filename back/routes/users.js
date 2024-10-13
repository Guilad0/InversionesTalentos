var express = require("express");
var router = express.Router();

const {
        getUsers,
        postUser,
        putInvestors,
        putStateInvestors,
        getUsersByRol,
        addInfClient,
        uploadimageUser,
        getInfoClientById,
        putClientInfo,
        uploadimageUserCloudinary,
        createUrlImg
        } = require("../controllers/users");



router.get("/", getUsers);
router.get("/:rol", getUsersByRol);
router.post("/", postUser);
router.put("/investors/:id", putInvestors);
router.put("/Stateinvestors/:id", putStateInvestors);
router.post("/upload/:id", uploadimageUser);
router.get("/clients/info/:id", getInfoClientById);
router.post("/info/", addInfClient);
router.put("/info/:id", putClientInfo);
router.get("/image/:id", createUrlImg);
router.post("/cloudinary/:id", uploadimageUserCloudinary);

module.exports = router;
