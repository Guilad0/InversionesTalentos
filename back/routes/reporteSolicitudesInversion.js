const express = require('express');
const router = express.Router();

const { getInversionesPendientes, getInversionesReversion, getInversionesProceso, getInversionesFinalizado } = require('../controllers/reporteSolicitudesInversion');

router.get('/pendiente', getInversionesPendientes);
router.get('/proceso', getInversionesProceso);
router.get('/reversion', getInversionesReversion);
router.get('/finalizado', getInversionesFinalizado);

module.exports = router;