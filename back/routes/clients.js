import express from "express";
import {sequelize} from '../database.js';
import { v2 as cloudinary } from 'cloudinary';
import { getDataError400, getError500, getResponse200, getResponse200WithData } from '../helpers/Response.js';
import { User, InformacionInversionista, Experiencia } from '../models/mainExport.js'; 
import { Op } from 'sequelize';

cloudinary.config(process.env.CLOUDINARY_URL);


var router = express.Router();


const getAllClientesWithInfo = async (req, res) => {
    try { 
        const query = `
        SELECT 
            u.usuario_id,
            u.nombre, 
            u.apellido, 
            u.correo, 
            u.categoria_persona_id,
            u.username, 
            u.pais_residencia,
            u.edad, 
            u.imagen,
            u.rol, 
            i.ocupacion, 
            u.estado,
            i.descripcion, 
            i.monto_inversion, 
            i.cantidad_maxima_inversiones,
            i.preparacion, 
            i.estudios, 
            i.vision,
            c.nombre AS categoria,
            s.nombre AS titulo
        FROM 
            usuarios AS u
        LEFT JOIN 
            informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
            categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
        LEFT JOIN 
            solicitudes_inversion AS s ON u.usuario_id = s.cliente_id
        WHERE 
            u.rol = :rol 
            AND s.aprobado = :aprobado 
            AND s.estado_inversion = :estadoInversion
            AND CURRENT_DATE BETWEEN s.fecha_inicio_recaudacion AND s.fecha_fin_recaudacion;
        `;
        const replacements = {
            rol: 'cliente',
            aprobado: 'Aprobado',
            estadoInversion: 'Pendiente',
        };
        const [results] = await sequelize.query(query, { replacements, type: sequelize.QueryTypes.SELECT });
        if (!results || results.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron clientes con la información especificada.',
            });
        }

        res.status(200).json({
            results,
            cant: results.length,
        });
    } catch (e) { 
        getError500('', e, res);
    }
}

const getAllClientesByCategory = async (req, res) => {
    try { 
        const query = `
        SELECT 
            u.usuario_id,
            u.nombre, 
            u.apellido, 
            u.correo, 
            u.categoria_persona_id,
            u.username, 
            u.pais_residencia,
            u.edad, 
            u.imagen,
            u.rol, 
            i.ocupacion, 
            i.descripcion, 
            i.monto_inversion, 
            i.cantidad_maxima_inversiones,
            i.preparacion, 
            i.estudios, 
            i.vision,
            c.nombre AS categoria,
            s.nombre AS titulo
        FROM 
            usuarios AS u
        LEFT JOIN 
            informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
            categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
        LEFT JOIN 
            solicitudes_inversion AS s ON u.usuario_id = s.cliente_id
        WHERE 
            u.rol = :rol
            AND u.categoria_persona_id = :categoriaId
            AND s.aprobado = :aprobado
            AND s.estado_inversion = :estadoInversion
            AND CURRENT_DATE BETWEEN s.fecha_inicio_recaudacion AND s.fecha_fin_recaudacion;
        `;
        const replacements = {
            rol: 'cliente',
            categoriaId: req.params.id,
            aprobado: 'Aprobado',
            estadoInversion: 'Pendiente',
        };
        const [results] = await sequelize.query(query, { replacements, type: sequelize.QueryTypes.SELECT });
        if (!results || results.length === 0) {
            return getDataError400('No se encontraron clientes para la categoría especificada.', res); 
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    } catch(e) { 
        getError500('Error al buscar clientes.', e, res);
    }
}
/**
 * Filtra clientes por su nombre ( usado en el marketplace )
 */
const getAllClientesByFilterName = async (req, res) => {
    try { 
        const searchTerm = req.params.id || '';
        const searchPattern = `${searchTerm}%`; 
        const query = `
        SELECT 
            u.usuario_id,
            u.nombre, 
            u.apellido, 
            u.correo, 
            u.categoria_persona_id,
            u.username, 
            u.imagen,
            u.pais_residencia,
            u.edad, 
            u.rol, 
            i.ocupacion, 
            i.descripcion, 
            i.monto_inversion, 
            i.cantidad_maxima_inversiones,
            i.preparacion, 
            i.estudios, 
            i.vision,
            s.nombre as titulo
        FROM 
            usuarios AS u
        LEFT JOIN 
            informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
            solicitudes_inversion AS s ON u.usuario_id = s.cliente_id
        WHERE 
            u.rol = :rol 
            AND s.aprobado = :aprobado
            AND s.estado_inversion = :estadoInversion
            AND u.nombre LIKE :searchPattern
            AND CURRENT_DATE BETWEEN s.fecha_inicio_recaudacion AND s.fecha_fin_recaudacion;
        `;
        const replacements = {
            rol: 'cliente',
            aprobado: 'Aprobado',
            estadoInversion: 'Pendiente',
            searchPattern,
        };
        const [results] = await sequelize.query(query, { replacements, type: sequelize.QueryTypes.SELECT });
        if (results.length === 0) { return getDataError400('No hay clientes encontrados!', res); }
        res.status(200).json({
            results,
            cant: results.length
        });
    } catch(e) { 
        getError500('Error al ejecutar la consulta!', e, res);
    }
}

const uploadimageUserCloudinary = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        return getDataError400('sin archivos para subir', res); }
    try { 
        const existUser = await User.findOne({ where: { usuarioId: req.params.id}});
        if (!existUser) { return getDataError400('Usuario no encontrado', res); }
        const extension = req.files.image.name.split('.').pop().toLowerCase();
        if (!['jpg', 'png', 'jpeg'].includes(extension)) { return getDataError400('Extensiones de imagen no permitidas', res); }
        try {
            await cloudinary.uploader.destroy(`clients/${req.params.id}`);
        } catch (error) {
            console.error("Error al eliminar imagen en Cloudinary:", error);
        }
        const { tempFilePath } = req.files.image;
        const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
            public_id: req.params.id,
            folder: 'clients'
        });
        const { secure_url } = uploadResult;
        const [updateImgUser] = await User.update({imagen: secure_url}, {where: {usuarioId: req.params.id}});
        if (updateImgUser === 0) { return getDataError400('Error al guardar la URL de la imagen', res); }
        res.status(201).json({
            msg: "Imagen actualizada con éxito", url: secure_url });
    } catch(e) { 
        getError500('Error de consulta SQL:', e, res); 
    }
};
//Esta funsion modifica los datos mas relevantes de  un inversor/cliente
//desde la vista  perfil
const putInvestors = async (req, res) => {
    const { username, correo } = req.body;
    const { id } = req.params;
    if (!id || !username || !correo) {
        return getDataError400('Faltan datos requeridos para la actualización.', res);
    }
    try { 
        const usuarios = await User.findOne(
            { where: { correo: correo, usuarioId: id}});
        if(!usuarios){ return getDataError400('user no encontrado!', res); }
        // Verificar si el username ya está en uso por otro usuario
        const users = await User.findOne(
            {where: { username: username, usuarioId: {[Op.ne]: id} }});
        if(usernameEnUso){
            return getDataError400('el username ya esta en uso!', res);
        }
        const [updateUser] = await User.update(
            {username: username}, { where: { usuarioId: id}});
        if (updateUser === 0) {
            return getDataError400('error en la actualizacion!', res);
        }
        getResponse200('Inversor Actualizado!', res);
    } catch(e) { 
        getError500('Error al actualizar al inversor!', e, res); 
    }
};

const getExperiencia = async (req, res) =>{
    const { id } = req.params;
    if (!id) { return getDataError400('El ID es requerido.', res); }
    try { 
        const experiencia = await Experiencia.findOne({ where: {clienteId: id} }); 
        if(!experiencia){
            return getDataError400('error al buscar la exp del user!', res);
        }
        getResponse200WithData('Experiencia obtenida!', experiencia, res);
    } catch(e) { 
        getError500('Error al buscar la experiencia del usuario!', e, res);
    }
};

const addInfinversionista = async (req, res) => {
    const { id_inversionista, nombre_completo, dni, tipo_dni, domicilio,
        ciudad, situacion_laboral, fuente_de_ingresos } = req.body;
    if (!id_inversionista || !nombre_completo || !dni || !tipo_dni || !domicilio || 
        !ciudad || !situacion_laboral || !fuente_de_ingresos) {
        return getDataError400('Faltan datos para agregar al inversionista.', res);
    }
    try { 
        const usuario = await User.findOne({ where: {usuarioId: id_inversionista}});
        if (!usuario) { return getDataError400('Usuario no encontrado', res); }
        const infoInvestment = await InformacionInversionista.findOne({ where: { idInversionista: id_inversionista}});
        if (infoInvestment) {
            return getDataError400('El inversionista ya cuenta con una informacion', res); 
        }
        const newInfoInvestment = await InformacionInversionista.create({ 
            idInversionista: id_inversionista, nombreCompleto: nombre_completo, 
            dni: dni, tipoDni: tipo_dni, domicilio: domicilio, ciudad: ciudad,
            situacionLaboral: situacion_laboral, fuenteDeIngresos: fuente_de_ingresos,
        })
        if (!newInfoInvestment) { return getDataError400('No se pudo crear la informacion', res); }
        getResponse200('Informacion agregada', res);
    } catch(e) { 
        getError500('', e, res);
    }
};

const changeRolUser = async (req,res)=>{
    const { usuario_id, rol }  = req.body;
    if (!usuario_id || !rol) { return getDataError400('Faltan parámetros para actualizar el rol.', res); }
    try {
        const query = await User.findOne({ where: { usuarioId: usuario_id}});
        if(!query){ return getDataError400('Usuario no encontrado!', res); } 
        const [updateRole] = await User.update({rol: rol,}, { where: { usuarioId: usuario_id }});
        if (updateRole === 0) { return getDataError400('No se pudo actualizar el rol', res); }
        getResponse200('Se Actualizo el Rol!', res);
    } catch(e) { 
        getError500('Error al actualizar el rol', e, res);
    }
}
  
const getRol = async (req, res) => {
    const { id } = req.query;
    try { 
        const query = await Usuario.findOne({
            attributes: ['rol'], where: { usuarioId: id }
          });
        if(!query){ return getDataError400('error al buscar al user!', res); }
        res.status(200).json({
            rol: query.rol
        });
    } catch(e) { 
        getError500('Error al Obtener', res); 
    }
}

const getuserById = async (req,res)=> {
    const { id } = req.query; 
    try {  
        const query = await User.findOne({ where: { usuarioId: id }});
        if(!query){ return getDataError400('Erro al buscar usuario', res); }
        getResponse200WithData('Usuario Obtenido!', res);
    } catch(e) { 
        getError500('Erro al buscar usuario', e, res);
    }
};


router.get("/", getAllClientesWithInfo);
router.get("/findBy/:id", getAllClientesByCategory);
router.get("/filterByName/:id", getAllClientesByFilterName);
router.post("/cloudinary/image/:id", uploadimageUserCloudinary);
router.put("/:id", putInvestors);
router.get("/getExperienceById/:id", getExperiencia);
router.post("/addInfoInversionista/", addInfinversionista);
router.put("/changeRol/user", changeRolUser);
router.get("/getRol/user", getRol);
router.get("/getUserById/user", getuserById);


export default router;

