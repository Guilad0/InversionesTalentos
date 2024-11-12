const express = require('express');
const router = express.Router();
const {getInformacion,postInformacion, saveVideo, getClienteIdByUsuarioId} = require ('../controllers/informacionController')

router.get('/', getInformacion);
router.post('/', postInformacion);
router.post('/videoUpload', saveVideo);
router.get('/getcliente/:usuario_id', getClienteIdByUsuarioId);

module.exports = router;
