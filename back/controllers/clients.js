const { response: res, request: req } = require('express')
const conexion = require('../database');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');
// const { uploadFile } = require('../helpers/uploadImage');
// const { v4: uuidv4 } = require('uuid');
// const cloudinary = require('cloudinary').v2;
// const transporter = require('../helpers/mailer');
// const crypto = require('crypto');


const getAllClientesWithInfo = (req, res) => {
    let query = `
    SELECT 
    u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.rol, 
        i.ocupacion, 
        u.estado,
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision,
        c.nombre as categoria
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
         LEFT JOIN 
        categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
    WHERE 
        u.rol = "cliente";
    `;
    
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });
}


const getAllClientesByCategory = async (req, res) => {
    let query = `
    SELECT 
    u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
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
        c.nombre as categoria
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
        categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
    WHERE 
        u.rol = "cliente" and u.categoria_persona_id = ?;
    ;
    `;
    
    conexion.query(query, [req.params.id],(err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });

}

/**
 * Filtra clientes por su nombre ( usado en el marketplace )
 */

const getAllClientesByFilterName =  (req, res) => {
    const searchTerm = req.params.id || '';
    const searchPattern = `${searchTerm}%`; 
    let query = `
    SELECT 
        u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.rol, 
        i.ocupacion, 
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
    WHERE 
        u.rol = "cliente" and u.nombre like  ?;
    ;
    `;
    
    conexion.query(query, [searchPattern],(err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });

}

const uploadimageUserCloudinary = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }

    let query = 'SELECT * FROM usuarios WHERE usuario_id = ?';
    conexion.query(query, [req.params.id],async (err, results) => {
        if (err) {
            res.status(500).json({
                err,
            });
            return;
        }
        console.log(results);
        if (results.length === 0) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }

        try {
            let extension = req.files.image.name.split('.');
            extension = extension[extension.length - 1];
            if (extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg') {
                return res.status(404).json({
                    msg: 'Extensiones de imagen no permitidas',
                });
            }
            cloudinary.uploader.destroy(`clients/${'clients/'+req.params.id}`);
            const { tempFilePath } = req.files.image;
            const result = await cloudinary.uploader.upload(tempFilePath, {
                    public_id: req.params.id,
                    folder: 'clients'
            });
            const { secure_url } = result;
            query = 'update usuarios set imagen = ? where usuario_id = ?';
            conexion.query(query, [secure_url, req.params.id], async (err) => {
                if (err) {
                    return res.status(404).json({
                        msg: 'Usuario no encontrado/Error al guardar nombre de imagen',
                    });
                }
                
                res.status(201).json({
                    url: secure_url
                })
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error al procesar la imagen',
                error
            });
        }

    });
};

/**
 *  Esta funsion modifica los datos mas relevantes de  un inversor/cliente
 * desde la vista  perfil
 */
const putInvestors = async (req, res) => {
    const { username, correo } = req.body;
    let query = 'select * from usuarios where correo = ? and usuario_id = ?';
    conexion.query( query, [correo, req.params.id], (err, results) =>{
      if( err ){
          return res.status(err.status || 404).json({
              msg:err.message || 'Error en la peticion'
          })
      }
      if( results.length == 0 ){
          return res.status(err.status || 404).json({
              msg:err.message || 'Usuario no encontrado'
          })
      }
      
    query = 'select * from usuarios where username = ?';
    conexion.query(query, [username], (err, results)=>{
        if( err ){
            return res.status( 404).json({
                msg: 'Error en la peticion'
            })
        }
        if( results.length > 0 ){
            return res.status( 404).json({
                msg: 'El username ya esta en uso' 
            })
        }

        query =
        "update usuarios set username=? where usuario_id = ?";
      const values = [
        username,
        req.params.id,
      ];
      conexion.query(query, values, (error) => {
        if (error) {
          res.status(500).json({
            msg: "Error en la petición",
            error: error.message,
          });
        } else {
          res.status(201).json({
            msg: "Inversor actualizado",
          });
        }
      });
    })
    } )
  };
  
  const getExperiencia = (req, res) =>{
    console.log(req.query.type);
    let query = `select * from ${req.query.type}  where cliente_id = ?`;
    conexion.query(query,[req.params.id], (err, results) =>{
        if( err  ){
            res.status(500).json({
                err,
                msg:'Error al buscar la experiencia del usuario'
            })
            return;
        }
        res.status(201).json({
            results
        })
    })
  }

module.exports = {
    getAllClientesWithInfo, 
    getAllClientesByCategory,
    getAllClientesByFilterName,
    uploadimageUserCloudinary,
    putInvestors,
    getExperiencia
}
