const express = require('express');
const router = express.Router();
const {
  getSolicitudesInversion,
  getSolicitudesInversionAprobados,
  getSolicitudesInversionPendientes,
  getSolicitudesInversionRechazados,
  getSolicitudInversionById,
  createSolicitudInversion,
  updateSolicitudInversion,
  aprobarSolicitudInversion,
  deleteSolicitudInversion,
  getSolicitudesInversionByUserId,
  getTotals
} = require('../controllers/solicitudesInversion');

router.get('/', getSolicitudesInversion);
router.get('/aprobados', getSolicitudesInversionAprobados);
router.get('/pendientes', getSolicitudesInversionPendientes);
router.get('/rechazados', getSolicitudesInversionRechazados);
router.get('/:id', getSolicitudInversionById);
router.post('/', createSolicitudInversion);
router.put('/:id', updateSolicitudInversion);
router.patch('/aprobar/:id', aprobarSolicitudInversion);
router.delete('/:id', deleteSolicitudInversion);
router.get('/user/:userId', getSolicitudesInversionByUserId);
router.get('/getTotals/totals', getTotals)

module.exports = router;