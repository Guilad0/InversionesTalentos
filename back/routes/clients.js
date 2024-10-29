var express = require("express");
var router = express.Router();

const   {
            getAllClientesWithInfo,
            getAllClientesByCategory,
            getAllClientesByFilterName,
            uploadimageUserCloudinary,
            putInvestors

        } = require("../controllers/clients");

router.get("/", getAllClientesWithInfo);
router.get("/findBy/:id", getAllClientesByCategory);
router.get("/filterByName/:id", getAllClientesByFilterName);
router.post("/cloudinary/:id", uploadimageUserCloudinary);
router.put("/:id", putInvestors);

module.exports = router;

