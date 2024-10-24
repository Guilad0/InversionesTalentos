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
        createUrlImg,
        changeStateUser,
        verifyEmail,
        getUsersByname,
        getUserById,
        handleTelefono,
        handleEmail
        } = require("../controllers/users");



router.get("/", getUsers);
router.get("/filterUsersByName/:id", getUsersByname);
router.get("/:rol", getUsersByRol);
router.post("/", postUser);
router.put("/investors/:id", putInvestors);
router.put("/Stateinvestors/:id", putStateInvestors);
router.post("/upload/:id", uploadimageUser);
router.get("/clients/info/:id", getInfoClientById);
router.post("/info/", addInfClient);
router.put("/info/:id", putClientInfo);
router.get("/image/:id", createUrlImg);
router.put("/changeState/:id", changeStateUser);
router.put("/verify", verifyEmail);
router.get("/getUserById/:id", getUserById);
router.get("/handleEmail/correo", handleEmail);
router.get("/handleTelefono/telefono", handleTelefono);
 

module.exports = router;
