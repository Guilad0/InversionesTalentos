import express from 'express';
import { uploadFile } from "../helpers/uploadImage.js";
import path from "path";
import fs from "fs";
import { getDataError400, getError500, getResponse200, getResponse200WithData } from "../helpers/Response.js";
import { CategoriaPersona, User, Informacion } from "../models/mainExport.js";
import { Op } from "sequelize";



const router = express.Router();


const getCategories = async (req, res) => {
  const porPagina = 10;
  const pagina = parseInt(req.query.page, 10) || 1;
  const busqueda = req.query.search || "";
  const salto = (pagina - 1) * porPagina;
  try { 
          // Consulta para contar el número total de filas
    const numFilas = await CategoriaPersona.count({ where: { nombre: { [Op.like]: `%${busqueda}%` }}});
    const numPaginas = Math.ceil(numFilas / porPagina);
      // Consulta para obtener los datos con paginación y búsqueda
    const results = await CategoriaPersona.findAll({
      attributes: [
        'categoria_persona_id',
        'nombre',
        'imagen',
        'estado',
        'monto_minimo_inversion',
        'monto_maximo_inversion',
        'porcentaje_interes',
      ],
      where: {
        nombre: {
          [Op.like]: `%${busqueda}%`, 
        },
      },
      limit: porPagina,
      offset: salto, // Desplazamiento
    });
    const paginas = Array.from({ length: numPaginas }, (_, i) => i + 1);
    const paginacion = {
    total: numFilas,
    current: pagina,
    pages: paginas,
    perPage: porPagina,
    previous: pagina > 1 ? pagina - 1 : null,
    next: pagina < numPaginas ? pagina + 1 : null,
    };
    res.status(200).json({
      results,
      paginacion,
      message: "Listando categorías",
    });
  } catch(e) { 
    getError500('Error al obtener las categorías', e, res);
  }
};

const changeState = async (req, res) => {
  try { 
    const categoria = await CategoriaPersona.findOne({ where: { categoriaPersonaId: req.params.id }});
    if (!categoria) { return getDataError400('Categoria no encontrada!', res); }
    const nuevoEstado = categoria.estado === 1 ? 0: 1;
    await CategoriaPersona.update({ estado: nuevoEstado}, { where: { categoriaPersonaId: req.params.id}});
    getResponse200(nuevoEstado === 1 ? "Categoría activada" : "Categoría desactivada", res);
  } catch(e) { 
    getError500('Error al buscar categorias', e, res);
  }
};
/**
 * Gaurda un nombre en la base de datos y una iamgen en la carpeta categories del sevidor
 */
const saveCategory = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) { 
    return getDataError400('Sin archivos para subir', res); }
  let {nombre, montoInvMin, montoInvMax, porcentaje_interes } = req.body;
  if (!nombre || isNaN(montoInvMin) || isNaN(montoInvMax) || isNaN(porcentaje_interes)) {
    return getDataError400("Datos inválidos proporcionados", res); }
  porcentaje_interes = parseFloat(porcentaje_interes).toFixed(2);
  if (montoInvMin < 0 || montoInvMax < 0 || montoInvMin > montoInvMax) {
    return getDataError400("Los montos deben ser positivos y monto mínimo <= monto máximo.", res);
  }
  try {
    const categoriaExistente = await CategoriaPersona.findOne({ where: { nombre: nombre}});
    if (categoriaExistente) { return getDataError400(`La categoría '${nombre}' ya existe. Por favor, elija otro nombre.`, res); }
    const imgPath = await uploadFile( req.files, ["jpg", "png", "jpeg"], "categories" );
    if (!imgPath) { return getDataError400("Error al subir la imagen", res); }
    await CategoriaPersona.create({
      imagen: imgPath, nombre: nombre, montoMinimoInversion: montoInvMin, 
      montoMaximoInversion: montoInvMax, porcentajeInteres: porcentaje_interes,
    });
    getResponse200('Imagen y categoría cargadas exitosamente', res);
  } catch (e) { 
    getError500('Error al operar con la categoria', e, res);
  }
};

const getById = async (req, res) => {
  try {
    const categoria = await CategoriaPersona.findOne({ where: { categoriaPersonaId: req.params.id}});
    if (!categoria) { return getDataError400("Categoría no encontrada", res); }
    getResponse200WithData('Categoria obtenida!', categoria, res)
  } catch(e) { 
    getError500('Error al obtener la categoría!', e, res)
  }
};
/**
 * Actualiza una imagen del servidor
 */
const updateImgCategory = async (req, res) => {
  const { nombre, monto_maximo_inversion, monto_minimo_inversion, porcentaje_interes } = req.body;
  const { id } = req.params;
  try { 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      const [updated] = await CategoriaPersona.update({
          nombre: nombre,
          montoMinimoInversion: monto_minimo_inversion,
          montoMaximoInversion: monto_maximo_inversion,
          porcentajeInteres: porcentaje_interes,
        }, {
          where: { categoriaPersonaId: id }
        }
      );
      if (updated) { getResponse200('Categoria actualizada!', res); 
      } else { getDataError400('Categoría no encontrada', res); }
    } else {
        const querySelect = await CategoriaPersona.findOne({ where: { categoriaPersonaId: id }});
        if (!querySelect) { return getDataError400('No se encontró la categoria', res); }
        const oldImgPath = querySelect.imagen;
        if (oldImgPath) {
          const fullPath = path.join(__dirname, "../uploads/categories", oldImgPath );
          fs.unlink(fullPath, (err) => {
            if (err) { console.error("Error al eliminar la imagen anterior:", err); }
            return;
          });
        }
        try {
          const imgPath = await uploadFile( req.files, ["jpg", "png", "jpeg"], "categories" );
          const [queryUpdate] = await CategoriaPersona.update({
            imagen: imagen, nombre: nombre, monto_minimo_inversion: monto_minimo_inversion,
            monto_maximo_inversion: monto_maximo_inversion, porcentaje_interes: porcentaje_interes,
              }, {where: { categoriaPersonaId: id}});
          if(!queryUpdate) { 
            return getDataError400('Error al actualizar la categoría con imagen', res);
          }
          return getResponse200('Imagen y categoría actualizadas', res);
        } catch (e) {
          return getDataError400('Error', e, res);
        }
    };
  } catch(e) {
    return getError500('Error en la actualizacion!', e, res); 
  }
};

const createUrlImg = async (req, res) => {
  try {
    const query = await CategoriaPersona.findOne({ where: {categoriaPersonaId: req.params.id}});
      if (!query) { return getDataError400('categoria no encontrada!', res); }
      const userImg = query.imagen;
      if (!userImg) { return getDataError400('Imagen no definida para esta categoría', res); }  
      const pathImg = path.join(__dirname, "../uploads/categories/", userImg);
      fs.access(pathImg, fs.constants.F_OK, (err) => {
        if (err) { return getDataError400('No se encontro la imagen', res); }
        res.sendFile(pathImg);
      });
  } catch(e) { 
    getError500('Error al buscar categoria', e, res); 
  }
};

const addRubr = async (req, res) => {
  const { usuario_id, categoria_persona_id } = req.body;
  if (!categoria_persona_id || !usuario_id) { return getDataError400('Categoria o User es requerido', res); }
  try { 
    const [userUpdated] = await User.update({ categoriaPersonaId: categoria_persona_id }, 
      {where: { usuarioId: usuario_id }}); 
    if (userUpdated === 0) { return getDataError400('Usuario no encontrado o no se realizó ninguna actualización', res); }
    return getResponse200WithData('User Actualizado!', { usuarioId: usuario_id, categoriaPersonaId: categoria_persona_id }, res);
  } catch(e) { 
    getError500('Error al actualizar categoria de user!', e, res);
  }
};

const getVideoUrl = async (req, res) => {
  const { id } = req.params;
  try { 
    const query = await Informacion.findOne({ where: { clienteId: id }});
    if (!query.video) { return getDataError400('Video no encontrado para el ID especificado', res); }
    const videoName = query.video;
    const videoPath = path.join(__dirname, '../uploads/videos', videoName);
    fs.access(videoPath, fs.constants.F_OK, (err) => {
      if (err) { return getDataError400('Video no encontrado en el sistema de archivos', res); }
      // Genera la URL dinámica para el archivo existente, usando '/uploads/videos'  ????
      const videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${videoName}`;
      res.sendFile(videoPath);
    });
  } catch(e) { 
    getError500('Error al buscar video', e, res);
  }
};

const getCategoryByUserId = async (req, res) => {
  const { id } = req.params;
  try { 
    const categoria = await CategoriaPersona.findOne({ 
      include: [{
        model: User,
        where: { usuarioId: id },
        required: true, 
      }],
    })
    if (!categoria) { return getDataError400("Categoría no encontrada para el usuario", res); }
    getResponse200WithData('Categoria obtenida!', categoria, res);
  } catch(e) { 
    getError500('Error al obtener la categoría del usuario!', e, res); 
  }
};

router.get('/', getCategories)
router.patch('/state/:id', changeState)
router.post('/', saveCategory);
router.put('/:id', updateImgCategory)
router.get('/image/:id', createUrlImg)
router.get('/video/:id', getVideoUrl)
router.put('/updateImageCategory/:id', updateImgCategory)
router.get('/:id', getById)
router.post('/rubro', addRubr),
router.get('/user/:id', getCategoryByUserId);


export default router;