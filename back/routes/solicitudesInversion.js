const express = require('express');
const router = express.Router();
const {
  getSolicitudesInversion,
  getSolicitudInversionById,
  createSolicitudInversion,
  updateSolicitudInversion,
  aprobarSolicitudInversion,
  deleteSolicitudInversion
} = require('../controllers/solicitudesInversion');

router.get('/', getSolicitudesInversion);
router.get('/:id', getSolicitudInversionById);
router.post('/', createSolicitudInversion);
router.put('/:id', updateSolicitudInversion);
router.patch('/aprobar/:id', aprobarSolicitudInversion);
router.delete('/:id', deleteSolicitudInversion);

module.exports = router;