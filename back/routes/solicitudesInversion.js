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
  procesarSolicitudInversion,
  deleteSolicitudInversion,
  getSolicitudesInversionByUserId,
  getTotals,
  showButton,
  getInversoresDeSolicitud,
  finalizarInversion,
  revertirInversion,
  cambiarEstadoProceso
} = require('../controllers/solicitudesInversion');

router.get('/', getSolicitudesInversion);
router.get('/aprobados', getSolicitudesInversionAprobados);
router.get('/pendientes', getSolicitudesInversionPendientes);
router.get('/rechazados', getSolicitudesInversionRechazados);
router.get('/:id', getSolicitudInversionById);
router.post('/', createSolicitudInversion);
router.put('/:id', updateSolicitudInversion);
router.put('/aprobar/:id', procesarSolicitudInversion);
router.delete('/:id', deleteSolicitudInversion);
router.get('/user/:userId', getSolicitudesInversionByUserId);
router.get('/showButton/:id', showButton);
router.get('/getTotals/totals', getTotals),
  router.get('/getInversoresDeSolicitud/:id', getInversoresDeSolicitud),
  router.put('/finalizarInversion/:id', finalizarInversion),
  router.put('/revertirInversion/:id', revertirInversion),
  router.put('/cambiarEstadoProceso/:id', cambiarEstadoProceso);


module.exports = router;