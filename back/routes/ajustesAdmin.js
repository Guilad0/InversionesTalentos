import express from 'express';
import { Ajuste } from '../models/mainExport.js'
import { getDataError400, getError500, getResponse200WithData } from '../helpers/Response.js'; 



const router = express.Router();


const postCombinedData = async (req, res) => {
  const {comision_porcentual_ganancia, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, valor_token, admin_id} = req.body;
  try {
    const ajuste = await Ajuste.create({
      comisionPorcentualGanancia: comision_porcentual_ganancia, 
      comisionPorcentualRetiro: comision_porcentual_retiro,
      tiempoMinimoInversion: tiempo_minimo_inversion,
      tiempoMaximoInversion: tiempo_maximo_inversion,
      valorToken: valor_token,
      adminId: admin_id,
    });
    //res.status(201).json({ message: 'Ajuste creado', id: results.insertId });
    getResponse200WithData('Ajuste Creado', ajuste, res);
  } catch (e) {
    getError500('Error en la Insersion de ajuste', e, res); 
  }
};

const getCombinedData = async (req, res) => {
  try { 
    const ajustes = await Ajuste.findAll();
    if (ajustes.length === 0) {
      return getDataError400('No hay ajustes disponibles', res);
    }
    getResponse200WithData('Ajustes Obetenidos', ajustes[0], res);
  } catch (e) { 
    getError500('Error al obtener los ajustes', e, res);
  }
};

const putCombinedData = async (req, res) => {
  const { id } = req.params;
  const { comision_fija_ganancia, comision_porcentual_ganancia, 
    comision_fija_retiro, comision_porcentual_retiro,
     tiempo_minimo_inversion, tiempo_maximo_inversion, 
     sancion_porcentual_retraso, valor_token } = req.body;
  try { 
    const ajuste = await Ajuste.findByPk(id);
    if (!ajuste) { return getDataError400(`No se encontró un ajuste con ID: ${id}`, res); }
    await Ajuste.update({ 
      comision_fija_ganancia: comision_fija_ganancia,
      comision_porcentual_ganancia: comision_porcentual_ganancia,
      comision_fija_retiro: comision_fija_retiro,
      comision_porcentual_retiro: comision_porcentual_retiro,
      tiempo_minimo_inversion: tiempo_minimo_inversion,
      tiempo_maximo_inversion: tiempo_maximo_inversion,
      sancion_porcentual_retraso: sancion_porcentual_retraso,
      valor_token: valor_token,
    }, { where: { ajuste_id: id }});
    getResponse200WithData('Ajuste actualizado!', ajuste, res);
  } catch(e) { 
    getError500('Error en operacion', e, res);
  }
};

router.post('/', postCombinedData);
router.get('/', getCombinedData);
router.put('/:id', putCombinedData);

export default router;
