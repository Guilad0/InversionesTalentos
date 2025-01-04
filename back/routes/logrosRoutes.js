import express from 'express';
import {sequelize} from "../database.js";
import { getDataError400, getError500, getResponse200, getResponse200WithData } from "../helpers/Response.js";
import { Logro, } from "../models/mainExport.js";



const router = express.Router();


const getLogros = async (req, res) => {
  try {
    const logros = await Logro.findAll(); 
    if (!logros || logros.length === 0) { return getDataError400('logros no encontrados!', res); }
    getResponse200WithData('Lista de logros', logros, res);
  } catch (e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const postLogros = async (req, res) => {
  const { cliente_id, descripcion, fecha } = req.body;
  try {
    const newLogro = await Logro.create({ 
      clienteId:cliente_id, descripcion:descripcion, fecha:fecha,
    });
    if (!newLogro) { return getDataError400('no se pudo crear el logro!', res); }
    getResponse200WithData('Logro registrado exitosamente!', newLogro.logroId, res);
  } catch (e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const putLogros = async (req, res) => {
  const { descripcion } = req.body;
  const { id } = req.params;
  try {
    const [updateLogro] = await Logro.update(
      { descripcion:descripcion }, { where:{logroId: id} } );
    if (updateLogro === 0) { return getDataError400('no se pudo actualizar el logro!', res); }
    getResponse200('Logro actualizado correctamente', res);
  } catch (e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const deleteLogros = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLogro = await Logro.destroy({where: {logroId: id}});
    if (deleteLogro === 0) { return getDataError400('No se encontró el logro con el ID proporcionado o ya ha sido eliminado.', res); }
    getResponse200('Logro eliminado correctamente', res);
  } catch (e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const patchLogros = async (req, res) => {
  const { id } = req.params;
  try {
    const [updateLogro] = await Logro.update(
      { estado: sequelize.literal('NOT estado') }, 
      { where: { logroId: id } }  );
    if (updateLogro === 0) { return getDataError400('no se pudo actualizar el estado del logro', res); }
    getResponse200('Estado del logro actualizado', res); 
  } catch (e) { 
    getError500('Error en la consulta!', e, res);
  }
};

router.get('/', getLogros); // Obtener logros
router.post('/', postLogros); // Crear un logro
router.put('/:id', putLogros); // Actualizar un logro
router.delete('/:id', deleteLogros); // Eliminar un logro
router.patch('/estado/:id', patchLogros); // Cambiar estado de un logro


export default router;
