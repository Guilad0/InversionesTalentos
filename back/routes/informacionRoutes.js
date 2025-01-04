import express from 'express';
import {sequelize} from "../database.js";
import { uploadVideo } from '../helpers/uploadVideo.js';
import { getDataError400, getError500, getResponse200, getResponse200WithData } from "../helpers/Response.js";
import { Informacion, } from "../models/mainExport.js";



const router = express.Router();


const getInformacion = async (req, res) => {
  try { 
    const informaciones = await Informacion.findAll({});
    if (informaciones.length === 0) { return getDataError400('No se encontraron informaciones!', res); }
    getResponse200WithData("Datos Obtenidos!", informaciones, res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const postInformacion = async (req, res) => {
  const { cliente_id, ocupacion, descripcion, monto_inversion, 
    cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;
  try { 
    const newInformacion = await Informacion.create({
      clienteId:cliente_id, ocupacion:ocupacion, descripcion:descripcion, 
      montoInversion:monto_inversion, cantidadMaximaInversiones:cantidad_maxima_inversiones,
      preparacion:preparacion, estudios:estudios, vision:vision,
    })
    if (!newInformacion) { return getDataError400('error al crear la informacion', res); }
    res.status(201).json({ message: "Informacion registrada", id: newInformacion.id });
  } catch(e) { 
    getError500('Error en la consulta', e, res);
  }
};

const saveVideo = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.video) {
    return getDataError400('Sin archivos para subir', res); }
  try { 
    const videoFile = req.files.video;
    const maxSize = 100 * 1024 * 1024; // 100MB en bytes
    if (videoFile.size > maxSize) { return getDataError400(`"El archivo supera el tamaño máximo permitido de ${maxSize / 1024 / 1024}MB"`, res); }
    const { cliente_id } = req.body;
    const informacion = await Informacion.findOne({where:{ clienteId:cliente_id }});
    if (!informacion) { return getDataError400('cliente no encontrado!', res); }
    try {
      const videoPath = await uploadVideo({ file: videoFile }, ['mp4', 'avi', 'mov', 'wmv'], 'videos');
      const [updateInformacion] = await Informacion.update({video:videoPath}, { where: {clienteId:cliente_id}});
      if (updateInformacion === 0) { return getDataError400('no se pudo actualizar la info del video!', res); }
      getResponse200('Viedo cargado!', res);
    } catch (err) {
      res.status(400).json({err});
    }
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getClienteIdByUsuarioId = async (req, res) => {
  const { usuario_id } = req.params;
  try{ 
    const query = `
        SELECT i.cliente_id
        FROM usuarios u
        JOIN informacion i ON u.usuario_id = i.cliente_id
        WHERE u.usuario_id = :usuario_id;
      `;
    const [results, metadata] = await sequelize.query(query, {
      replacements: { usuario_id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (results.length === 0) { return getDataError400('Cliente no encontrado', res); }
    res.status(200).json({ cliente_id: results[0].cliente_id});
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};


router.get('/', getInformacion);
router.post('/', postInformacion);
router.post('/videoUpload', saveVideo);
router.get('/getcliente/:usuario_id', getClienteIdByUsuarioId);


export default router;
