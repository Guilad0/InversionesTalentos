const express = require('express');
const router = express.Router();
const {getInformacion,postInformacion} = require ('../controllers/informacionController')

router.get('/', getInformacion);
router.post('/', postInformacion);

module.exports = router;
