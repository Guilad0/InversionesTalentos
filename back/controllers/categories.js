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

const getCategories = (req, res) => {
  // Parámetros de paginación y búsqueda
  const porPagina = 10;
  const pagina = parseInt(req.query.page, 10) || 1;
  const busqueda = req.query.search || '';
  const salto = (pagina - 1) * porPagina;
  const limite = `${salto}, ${porPagina}`;
  
  // Consulta para contar el número total de filas
  const queryFilas = `SELECT COUNT(*) AS numFilas
                      FROM categoria_personas
                      WHERE nombre LIKE '%${busqueda}%';`;

  conexion.query(queryFilas, (err, results) => {
    if (err) {
      return res.status(500).json({
        err,
        msg: "Error al contar las filas",
      });
    }

    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    // Consulta para obtener los datos con paginación y búsqueda
    const query = `SELECT categoria_persona_id, nombre, imagen, estado
                   FROM categoria_personas
                   WHERE nombre LIKE '%${busqueda}%'
                   LIMIT ${limite};`;

    conexion.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          err,
          msg: "Error al obtener las categorías",
        });
      }

      const paginas = Array.from({ length: numPaginas }, (_, i) => i + 1);

      const paginacion = {
        total: numFilas,
        current: pagina,
        pages: paginas,
        perPage: porPagina,
        previous: (pagina > 1) ? (pagina - 1) : null,
        next: (pagina < numPaginas) ? (pagina + 1) : null,
      };

      res.status(200).json({
        results,
        paginacion,
        message: 'Listando categorías',
      });
    });
  });
};

const changeState = (req, res) => {
  let query = "SELECT * FROM categoria_personas WHERE categoria_persona_id = ?";
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
    query = `UPDATE categoria_personas SET estado=!estado WHERE categoria_persona_id = ?`;
    conexion.query(query, [req.params.id], (err) => {
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
    let query = 'SELECT * FROM categoria_personas WHERE nombre = ?';
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
          query = 'INSERT INTO categoria_personas (imagen,nombre) VALUES (?,?)';
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

  const getById = (req, res) => {
     let query = "SELECT * FROM categoria_personas WHERE categoria_persona_id = ?"; 
     conexion.query(query, [req.params.id], (err, data) => { 
      if (err) { 
        console.error("Error al obtener la categoría:", err); // Log de error en el servidor 
        return res.status(500).json({ msg: "Error al obtener la categoría", err, }); } 
        if (data.length === 0) { 
          return res.status(404).json({ msg: "Categoría no encontrada", }); } 
          res.status(200).json(data[0]); });};



/**
 * Actualiza una imagen del servidor
 */
const updateImgCategory = (req, res)=>{
  let { nombre } = req.body;
  nombre = nombre.toLowerCase();
  let query = ''
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      const query = 'UPDATE categoria_personas SET nombre = ? WHERE categoria_persona_id = ?';
      conexion.query(query,[nombre, req.params.id], err =>{
          if( err ){
            res.status(500).json({
              msg:'Error al procesar la actualizacion',
              err
            })
            return
          }
          res.status(201).json({
            msg:'Categoria actualizada'
          })
      })
  } else{

      const querySelect = 'SELECT * FROM categoria_personas  WHERE categoria_persona_id = ?';
      conexion.query(querySelect, [req.params.id],async (err,data) =>{
        if( err || data.length === 0 ){
          console.error('Error al encontrar la categoría:', err);
          res.status(500).json({
            msg:'No se encontró la categoria',
            err
          })
          return
        }
        const oldImgPath = data[0].imagen;
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
        const queryUpdate = 'UPDATE categoria_personas SET imagen = ?, nombre = ? WHERE categoria_persona_id = ?';
          conexion.query(queryUpdate, [imgPath, nombre, req.params.id], (err)=>{
            if (err) { 
              console.error('Error al actualizar la categoría con imagen:', err); 
              return res.status(500).json({ err, }); } 
              res.status(201).json({ msg: 'Imagen y categoría actualizadas', }); });
      } catch (err) {
        res.status(400).json({
          err
      });
      }
      
    })
  }
}

  const createUrlImg = (req, res) => {
    let query = 'SELECT * FROM categoria_personas WHERE categoria_persona_id=?';
    conexion.query(query, [req.params.id], (err, data) => {
        if (err || data.length == 0) {
            res.status(500).json({
                err,
                mag:'Error al buscar categoria'
            });
            return;
        }
        let userImg = data[0].image;
        const pathImg = path.join(__dirname, '../uploads/categories/', userImg);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    })
}


module.exports = {
  getCategories,
  changeState,
  saveCategory,
  getById,
  updateImgCategory,
  createUrlImg
  //// putCategorie,
};
