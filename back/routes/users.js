var express = require("express");
var router = express.Router();
const {conexion} = require('../database.js')

const {
        getUsers,
        postUser,
        putStateusers,
        getUsersByRol,
        addInfClient,
        uploadimageUser,
        getInfoClientById,
        putClientInfo,
        createUrlImg,
        verifyEmail,
        getUsersByname,
        getUserById,
        handleTelefono,
        handleEmail, 
        approvedUser,
        getInfoInvestor,
        getUsersBynameAndRol,
        getSolInvById
        } = require("../controllers/users");



router.get("/", getUsers);
router.get("/getInfoInvestor/:id", getInfoInvestor);
router.get("/filterUsersByName/:id", getUsersByname);
router.get("/filterUsersByNameAndRol/:nombre", getUsersBynameAndRol);
router.get("/filterByRol/:rol", getUsersByRol);
router.post("/", postUser);
router.put("/Stateinvestors/:id", putStateusers);
router.post("/upload/:id", uploadimageUser);
router.get("/clients/info/:id", getInfoClientById);
router.post("/info/", addInfClient);
router.put("/info/:id", putClientInfo);
router.get("/image/:id", createUrlImg);
router.get("/verify/:id", verifyEmail);
router.get("/getUserById/:id", getUserById);
router.get("/handleEmail/correo", handleEmail);
router.get("/handleTelefono/telefono", handleTelefono);
router.patch("/approved/:id", approvedUser);
router.get("/getSolInvById/:id", getSolInvById);
 
router.get('/AllUsers', async (req, res, next) => {
        conexion.query("SELECT * FROM usuarios", (err, results) => {
                if (err) {
                        return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ data: results, message: "Lista de logros" });
                });
});


module.exports = router;
