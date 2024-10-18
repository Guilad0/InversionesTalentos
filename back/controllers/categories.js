const conexion = require("../database");
const { response: res, request: req } = require("express");
const multer = require("multer");
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

/**
 * 
Actualiza el nombre de la categoria
 */
// const putCategorie = (req, res) => {
//   const { nombre } = req.body;
//   console.log(nombre);

//   let query = "select * from categoria_personas where categoria_persona_id = ?";
//   conexion.query(query, [req.params.id], async (err, data) => {
//     if (err || data.length === 0) {
//       return res.status(500).json({
//         err,
//         msg: "Categoria no encontrada",
//       });
//     }

//     try {
//       // Asegúrate de que `data[0].imagen` contenga el `public_id` (o parte del mismo) en Cloudinary
//       let oldPublicId = data[0].nombre; // Aquí debería estar el public_id de Cloudinary, no solo el nombre de la categoría
//       let newPublicId = `categories/${nombre}`; // Por ejemplo, puedes renombrar la imagen basada en la nueva categoría

//       // Renombrar la imagen en Cloudinary
//       await cloudinary.uploader.rename('categories/'+oldPublicId, newPublicId);
//       const secureUrl = cloudinaryUrl(newPublicId);
//       // Actualizar la base de datos con el nuevo nombre de la categoría
//       query = "update categoria_personas set nombre = ?, imagen = ? where categoria_persona_id = ?";
//       conexion.query(query, [secureUrl, newPublicId, req.params.id], (err) => {
//         if (err) {
//           return res.status(500).json({
//             err,
//             msg: "Error al actualizar nombre",
//           });
//         }
//         res.status(201).json({
//           msg: "Categoria actualizada exitosamente",
//         });
//       });
//     } catch (error) {
//       return res.status(500).json({
//         msg: "Error al renombrar la imagen en Cloudinary",
//         error,
//       });
//     }
//   });
// };


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
 * actualziar iamgen de cloudinary
 */
// const updateImgCategory = (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
//     res.status(400).json({
//       msg: "Sin archivos para subir",
//     });
//     return;
//   }
//   let query = "select * from categoria_personas where categoria_persona_id = ?";
//   conexion.query(query, [req.params.id], (err, data) => {
//     if (err) {
//       res.status(400).json({
//         msg: "Categoria no encontrada",
//       });
//       return;
//     }
//     let img = data[0].imagen;
//     let extension = req.files.imagen.name.split(".");
//     extension = extension[extension.length - 1];
//     if (extension == "png" || extension == "jpg" || extension == "jpeg") {
//       try {
//         let query =
//           "update categoria_personas set imagen=? where categoria_persona_id = ?";
//         let nameFile = uuidv4() + "." + extension;
//         conexion.query(query, [nameFile, req.params.id], async (error) => {
//           if (error) {
//             return res.status(404).json({
//               msg: "Error en la consulta",
//             });
//           }
//           cloudinary.uploader.destroy(`categories/${img}`);
//           const { tempFilePath } = req.files.imagen;
//           const result = await cloudinary.uploader.upload(tempFilePath, {
//             public_id: nameFile,
//             folder: "categories",
//           });
//           const { secure_url } = result;
//           res.status(201).json({
//             url: secure_url,
//           });
//         });
//       } catch (error) {
//         return res.status(500).json({
//           msg: "Error al procesar la imagen",
//           error,
//         });
//       }
//     } else {
//       res.status(500).json({
//         msg: "Extension no valida",
//       });
//       return;
//     }
//   });
// };

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

/* 
gaurda una categoria yy sube la imagen a cloudnary
*/

// const saveCategory = async (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
//       return res.status(400).json({
//         msg: "Sin archivos para subir",
//       });
//     }
//     let {nombre} = req.body;
//     nombre = nombre.toLowerCase();
//     let query = 'select * from categoria_personas where nombre = ?';
//     conexion.query(query,[nombre], async(err, data)=>{
//       if (err) {
//         res.status(400).json({
//           msg: "Error al buscar categoria",
//         });
//         return;
//       }
//         if( data.length > 0 ){
//           res.status(404).json({
//             msg:'El nombre de la categoria ya existe!!'
//           })
//           return;
//         }
//         let extension = req.files.image.name.split('.');
//             extension = extension[extension.length - 1];
//             if (extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg') {
//                 return res.status(404).json({
//                     msg: 'Extensiones de imagen no permitidas',
//                 });
//             }
//             const { tempFilePath } = req.files.image;
//             const result = await cloudinary.uploader.upload(tempFilePath, {
//               public_id: nombre,
//               folder: 'categories'
//             });
//             const { secure_url } = result;
//             query = 'insert into categoria_personas (imagen,nombre) values (?,?)';
//             conexion.query(query,[secure_url,nombre], err =>{
//                 if( err ){
//                   res.status(404).json({
//                     msg:'Error al gaurdar el nombre',
//                     err
//                   })
//                   return;
//                 }
//                 res.status(201).json({
//                   imgUrl:secure_url
//                 })

//             })
            
//     })
//   };


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
