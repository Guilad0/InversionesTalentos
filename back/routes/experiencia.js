import express from 'express';
import {sequelize} from "../database.js";
import { getDataError400, getError500, getResponse200, getResponse200WithData } from "../helpers/Response.js";
import { Experiencia } from '../models/mainExport.js'; 



const router = express.Router();


const getExperiencia = async (req, res) => {
  try{ 
    const experiencias = await Experiencia.findAll({}); 
    if (experiencias.length === 0 ) return getDataError400('no se encontraron datos!', res);
    getResponse200WithData('Exito en los datos!', { experiencias }, res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const postExperiencia = async (req, res) => {
  const { cliente_id, institucion, cargo, actividades, fecha_inicio, fecha_final,
          } = req.body;
  if (!cliente_id || !institucion || !cargo || !actividades || !fecha_inicio) {
    return getDataError400('Faltan datos obligatorios para crear la experiencia', res);
  }
  try {
    const newExperiencia = await Experiencia.create({
      clienteId:cliente_id, institucion:institucion,
      cargo:cargo, actividades:actividades, fechaInicio:fecha_inicio,
      fechaFinal:fecha_final,
    }) 
      if (!newExperiencia) { return getDataError400('error al crear la experiencia!', res); }
      res.status(201).json({ message: "Experiencia creada", id: newExperiencia.insertId });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }fecha_inicio
};

const putExperiencia = async (req, res) => {
  const { institucion, cargo, actividades } = req.body;
  if (!institucion || !cargo || !actividades) { return getDataError400('Faltan datos obligatorios para actualizar la experiencia', res); }
  try { 
    const [expUpdate] = await Experiencia.update({
      institucion: institucion, cargo: cargo, actividades: actividades
    }, { where: { clienteId: req.params.id}});
    if (expUpdate === 0) { return getDataError400('error en la actualizacion!', res); }
    getResponse200('Experiencia modificada', res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
}; 

const patchExperiencia = async (req, res) => {
  const { id } = req.params;
  try { 
    const [updateExp] = await Experiencia.update(
      { estado: sequelize.literal('NOT estado')}, { where: { experienciaId: id} } );
    if (updateExp === 0) { return getDataError400('error al actualizar la experiencia!', res); }
    getResponse200('Movimiento eliminado', res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};


router.get('/', getExperiencia);
router.post('/', postExperiencia);
router.put('/:id', putExperiencia);
router.patch('/:id', patchExperiencia);



export default router;
