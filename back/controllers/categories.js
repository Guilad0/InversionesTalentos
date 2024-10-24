const conexion = require("../database");
const { response: res, request: req } = require("express");
const { uploadFile } = require("../helpers/uploadImage");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const path = require('path');
const fs = require('fs');

/**
obtiene la lista de categorias activas
 */

const getCategoies = (req, res) => {
  let query = "select categoria_persona_id,nombre, imagen from categoria_personas where estado=1";
  conexion.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        err,
        msg: "Error al iniciar peticion",
      });
      return;
    }
    res.status(200).json({
      results,
      cantidad: results.length,
    });
  });
};




const changeState = (req, res) => {
  let query = "select * from categoria_personas WHERE categoria_persona_id = ?";
  conexion.query(query, [req.params.id], (err, data) => {
    if (err) {
      res.status(500).json({
        err,
        msg: "Error al buscar categorias",
      });
      return;
    }
    if (data.length == 0) {
      res.status(404).json({
        err,
        msg: "Categoria no encontrada",
      });
      return;
    }
    let state = data[0].estado;
    console.log(state);
    query = `update categoria_personas set estado=!estado`;
    conexion.query(query, (err) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "Error al actualizar estado",
        });
        return;
      }
      res.status(201).json({
        msg: state == "1" ? "Categoria no activa" : "Categoria activa",
      });
    });
  });
};


/**
 * Actualiza una imagen del servidor
 */
const updateImgCategory = (req, res)=>{
  let { nombre } = req.body;
  nombre = nombre.toLowerCase();
  let query = ''
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      query = 'update categoria_personas set nombre = ? where categoria_persona_id = ?';
      conexion.query(query,[nombre, req.params.id], err =>{
          if( err ){
            res.status(500).json({
              msg:'Error al procesar la actualiacion',
              err
            })
            return
          }
          res.status(201).json({
            msg:'Categoria actualizada'
          })
      })
  } else{

      query = 'select * from categoria_personas  where nombre = ?';
      conexion.query(query,[nombre],async (err,data) =>{
        if( err || data.length == 0 ){
          res.status(500).json({
            msg:'No se encontro la categoria',
            err
          })
          return
        }
        console.log(data);
        let oldImgPath = data[0].imagen;
        if (oldImgPath) {
          const fullPath = path.join(__dirname, '../uploads/categories', oldImgPath);
          fs.unlink(fullPath, (err) => {
              if (err) {
                  console.error('Error al eliminar la imagen anterior:', err);
              }
              return;
          });
      }
      try {

        const imgPath = await uploadFile(req.files,['jpg','png','jpeg'],'categories');
        query = 'update categoria_personas set imagen=?,nombre=? where categoria_persona_id = ?';
          conexion.query(query, [imgPath, nombre, req.params.id], (err)=>{
            if (err) {
              res.status(500).json({
                  err,
              });
              return;
          }
          res.status(201).json({
              ok: 'Imagen cargada',
          });
          })
      } catch (err) {
        res.status(400).json({
          err
      });
      }
      
    })
  }
}

const getById = (req, res) => {
  let query = "select * from categoria_personas where categoria_persona_id=?";
  conexion.query(query, [req.params.id], (err, data) => {
    if (err) {
      res.status(400).json({
        msg: "Categoria no encontrada",
      });
      return;
    }
    if (data.length == 0) {
      res.status(404).json({
        msg: "Usuario no encontrada",
      });
      return;
    }
    res.status(500).json({
      data,
    });
  });
};



/**
 * Gaurda un nombre en la base de datos y una iamgen en la carpeta categories del sevidor
 */
  const saveCategory =  (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({
        msg: "Sin archivos para subir",
      });
    } 
    let {nombre} = req.body;
    nombre = nombre.toLowerCase()
    let query = 'select * from categoria_personas where nombre = ?';
    conexion.query( query,[nombre], async(err,data)=>{
        if( err || data.length > 0 ){
          res.status(500).json({
            err,
            msg:'Error al buscar usuario'
          })
          return;
        }
        try {
          
          const imgPath = await uploadFile(req.files,['jpg','png','jpeg'],'categories');
          query = 'insert into categoria_personas (imagen,nombre) values (?,?)';
          conexion.query(query, [imgPath, nombre], (err)=>{
            if (err) {
              res.status(500).json({
                  err,
              });
              return;
          }
          res.status(201).json({
              ok: 'Imagen cargada',
          });
            return
          })
        } catch (error) {
          res.status(400).json({
            error

        });
        }
    })
    
  };

  const createUrlImg = (req, res) => {
    let query = 'select * from categoria_personas where categoria_persona_id=?';
    conexion.query(query, [req.params.id], (err, data) => {
        if (err || data.length == 0) {
            res.status(500).json({
                err,
                mag:'Error al buscar categoria'
            });
            return;
        }
        let userImg = data[0].imagen;
        const pathImg = path.join(__dirname, '../uploads/categories/', userImg);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    })
}


module.exports = {
  getCategoies,
  saveCategory,
  // putCategorie,
  changeState,
  updateImgCategory,
  getById,
  createUrlImg
};
