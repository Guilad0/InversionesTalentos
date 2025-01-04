import express from "express";
import { sequelize } from "../database.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary} from "cloudinary";
import { getError500 } from "../helpers/Response.js";



var router = express.Router();
cloudinary.config(process.env.CLOUDINARY_URL);


const isClientFormInfoRegistered = async (req, res) => {
  try{
    let query = "select * from usuarios where usuario_id = ?";
    const { id } = req.query;
    sequelize.query(query, [id], (err, results) => {
      if (err || results.length == 0) {
        res.status(500).json({
          msg: "Error al buscar el cliente",
          err,
        });
        return;
      }
  
      query = "select * from informacion where cliente_id = ?";
      sequelize.query(query, [id], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar la inforamcion del cliente",
            err: err.message,
          });
          return;
        }
        if (results.length > 0) {
          res.status(200).json({
            msg: "El usuario ya cuenta con un registro de su inforamcion",
            ok: true,
            cant: results.length,
          });
          return;
        }
        res.status(200).json({
          msg: "El usuario aun no cuenta con un registro de su inforamcion",
          ok: false,
          cant: 1,
          cant: 0,
        });
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const isClientFormExperience = async (req, res) => {
  try{
    let query = "select * from usuarios where usuario_id = ?";
    const { id } = req.query;
    sequelize.query(query, [id], (err, results) => {
      if (err || results.length == 0) {
        res.status(500).json({
          msg: "Error al buscar el cliente",
          err,
        });
        return;
      }
  
      query = "select * from experiencia where cliente_id = ?";
      sequelize.query(query, [id], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar los logros  del cliente",
            err: err.message,
          });
          return;
        }
        if (results.length > 0) {
          res.status(200).json({
            msg: "El usuario ya cuenta con un registro de su experiencia",
            ok: true,
            cant: results.length,
          });
          return;
        }
        res.status(200).json({
          msg: "El usuario aun no cuenta con un registro de su experiencia",
          ok: false,
          cant: 1,
          cant: 0,
        });
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const isClientFormAchievements = async (req, res) => {
  try{
    let query = "select * from usuarios where usuario_id = ?";
    const { id } = req.query;
    sequelize.query(query, [id], (err, results) => {
      if (err || results.length == 0) {
        res.status(500).json({
          msg: "Error al buscar el cliente",
          err,
        });
        return;
      }
  
      query = "select * from logros where cliente_id = ?";
      sequelize.query(query, [id], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar la experiencia  del cliente",
            err: err.message,
          });
          return;
        }
        if (results.length > 0) {
          res.status(200).json({
            msg: "El usuario ya cuenta con un registro de su logros",
            ok: true,
            cant: results.length,
            cant: results.length,
          });
          return;
        }
        res.status(200).json({
          msg: "El usuario aun no cuenta con un registro de su logros",
          ok: false,
          cant: 0,
        });
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const isClientVideo = async (req, res) => {
  try{
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        msg: "El parámetro 'id' es obligatorio",
        ok: false,
      });
    }
  
    let query = "SELECT * FROM informacion WHERE cliente_id = ?";
    
    sequelize.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          msg: "Error al buscar el cliente",
          err: err.message || err,
          ok: false,
        });
      }
  
      if (results.length === 0) {
        return res.status(201).json({
          msg: "Cliente no encontrado",
          ok: false,
          cant: 0,
        });
      }
  
      const video = results[0].video;
  
      if (!video) {
        return res.status(200).json({
          msg: "El usuario no cuenta aún con un video",
          ok: false,
          cant: 0,
        });
      }
  
      // Si el usuario tiene un video
      return res.status(200).json({
        msg: "El usuario ya cuenta con un video",
        ok: true,
        cant: 1,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};


const isClientPhoto = async (req, res) => {
  try{
    let query = "select * from usuarios where usuario_id = ?";
    const { id } = req.query;
    sequelize.query(query, [id], (err, results) => {
      if (err || results.length == 0) {
        res.status(500).json({
          msg: "Error al buscar el cliente",
          err,
        });
        return;
      }
      if (results[0].imagen == "" || results[0].imagen == null) {
        res.status(200).json({
          msg: "El usuario no cuenta aun con una imagen",
          ok: false,
          cant: 0,
        });
        return;
      }
      res.status(200).json({
        msg: "El usuario ya cuenta con una imagen",
        ok: true,
        cant: 1,
      });
      return;
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const isInversorInfo = async (req, res) => {
  try{
    const { id } = req.query;
    let query = "select * from usuarios where usuario_id = ?";
    sequelize.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).json({
          msg: "Error al buscar usuario/Usuario no encontrado",
          err,
        });
        return;
      }
      query =
        "select id from informacion_inversionista where id_inversionista = ?";
      sequelize.query(query, [id], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar usuario/",
            err,
          });
          return;
        }
        if (results.length == 0) {
          res.status(200).json({
            ok: false,
            cant: 0,
            msg: "El inversor no cuenta con un registro",
          });
          return;
        }
        res.status(200).json({
          ok: true,
          msg: "El inversor ya cuenta con un registro",
          cant: 1,
        });
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const isInversorPhoto = async (req, res) => {
  try{
    const { id } = req.query;
    let query = "select * from usuarios where usuario_id = ?";
    sequelize.query(query, [id], (err, results) => {
      if (err || results.length == 0) {
        res.status(500).json({
          msg: "Error al buscar usuario/Usuario no encontrado",
          err,
        });
        return;
      }
      if (!results[0].imagen) {
        res.status(200).json({
          msg: "El usuario no cuenta con una selfie",
          ok: false,
          cant: 0,
        });
        return;
      }
      res.status(200).json({
        msg: "El usuario ya cuenta con una selfie",
        ok: true,
        cant: 1,
      });
      return;
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getFeatured = async (req, res) => {
  try{
      let sql = `SELECT 
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
      s.nombre AS titulo,
      COUNT(*) AS total_inversiones
      FROM 
          usuarios AS u
      LEFT JOIN 
          informacion AS i ON u.usuario_id = i.cliente_id
      LEFT JOIN 
          categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
      LEFT JOIN 
          solicitudes_inversion AS s ON u.usuario_id = s.cliente_id
      WHERE 
          u.rol = "cliente" 
          AND s.aprobado = 'Aprobado' 
          AND s.estado_inversion = 'Pendiente'
          AND CURRENT_DATE BETWEEN s.fecha_inicio_recaudacion AND s.fecha_fin_recaudacion
      GROUP BY 
          u.usuario_id, u.nombre, u.apellido, u.correo, u.categoria_persona_id, 
          u.username, u.pais_residencia, u.edad, u.imagen, u.rol, 
          i.ocupacion, u.estado, i.descripcion, i.monto_inversion, 
          i.cantidad_maxima_inversiones, i.preparacion, i.estudios, i.vision, 
          c.nombre, s.nombre
      ORDER BY 
          total_inversiones DESC
      LIMIT 5;
      `;
    sequelize.query(sql, (err, results) => {
      console.log(results);
      if (err) {
        res.status(500) -
          json({
            results: [],
            err,
          });
        return;
      }
      res.status(200).json({
        results,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const uploadimageUserCloudinaryHome = async (req, res) => {
  try{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({
        msg: "Sin archivos para subir",
      });
    }
    try {
      console.log("aquiiiiiiiiiiiii", req.files.image);
      const extension = req.files.image.name.split(".").pop().toLowerCase();
      if (!["jpg", "png", "jpeg"].includes(extension)) {
        return res
          .status(400)
          .json({ msg: "Extensiones de imagen no permitidas" });
      }
  
      await cloudinary.uploader.destroy(
        `home/${req.params.fieldImage}`,
        (error, result) => {
          if (error)
            console.error("Error al eliminar imagen en Cloudinary:", error);
          else console.log("Imagen eliminada en Cloudinary:", result);
        }
      );
  
      const { tempFilePath } = req.files.image;
      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        public_id: req.params.fieldImage,
        folder: "home",
      });
  
      const { secure_url } = uploadResult;
      console.log(req.params.fieldImage);
      let query = `UPDATE ajustes SET ${req.params.fieldImage} = ? WHERE ajuste_id = 6`;
      sequelize.query(query, [secure_url], (err) => {
        if (err) {
          console.error("Error al actualizar imagen en la base de datos:", err);
          return res.status(500).json({
            msg: "Error al guardar la URL de la imagen",
          });
        }
  
        res.status(201).json({
          msg: "Imagen actualizada con éxito",
          url: secure_url,
        });
      });
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      return res.status(500).json({
        msg: "Error al procesar la imagen",
        error,
      });
    }
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getAllImageHome = async (req, res) => {
  try{
    let query = "select image1,image2,image3 from ajustes where ajuste_id = 6";
    sequelize.query(query, (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "Error al obtener las imagenes",
        });
        return;
      }
      res.status(200).json({
        results,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const putTextHome = async (req, res) => {
  try{
    let query = `update ajustes set textHome = ? where ajuste_id = 6`;
    sequelize.query(query, [req.params.text], (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "error al guardar el texto",
        });
        return;
      }
      res.status(201).json({
        ok: "texto editado",
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getTextHome = async (req, res) => {
  try{
    let query = "select textHome from ajustes where ajuste_id = 6";
    sequelize.query(query, (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "error al buscar el texto",
        });
        return;
      }
      res.status(200).json({
        text: results[0].textHome,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getImagePartners = async (req, res) => {
  try{
    let query = "select partners from ajustes where ajuste_id = 6";
    sequelize.query(query, (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "error al buscar el texto",
        });
        return;
      }
      res.status(200).json({
        results,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getTextProposito = async (req, res) => {
  try{
    let query =
    "select propositoText,proposito_imagen from ajustes where ajuste_id = 6";
    sequelize.query(query, (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "error al buscar el texto",
        });
        return;
      }
      res.status(200).json({
        results,
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const putTextPurpose = async (req, res) => {
  try{
    let query = `update ajustes set propositoText = ? where ajuste_id = 6`;
    sequelize.query(query, [req.params.text], (err, results) => {
      if (err) {
        res.status(500).json({
          err,
          msg: "error al guardar el texto",
        });
        return;
      }
      res.status(201).json({
        ok: "texto editado",
      });
    });
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const savePercentajerUser = async (req, res) =>{
  try{
    let query = 'update usuarios set porcentaje_registro = ? where usuario_id = ?'
    sequelize.query(query, [req.query.porcentaje,req.params.id], (err, results) =>{
      if (err) {
        res.status(500).json({
          err,
          msg: "error al guardar el texto",
        });
        return;
      }
      res.status(201).json({
        ok: "Porcentaje actualzadoi",
      });
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
}

const getTotalInfoUsers = async (req, res) =>{
  try{
    let query = 'select aprobado, estado from usuarios'
    sequelize.query(query, (err, results) =>{
      if (err) {
        res.status(500).json({
          err,
          msg: "error al guardar el texto",
        });
        return;
      }
      res.status(201).json({
        results
      });
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
}

const getVideoSettings = async ( req, res ) =>{
  try{
    let query = 'select video from ajustes';
    sequelize.query(query, (err, results) =>{
        if(err){
          res.status(500).json({
            err
          })
          return
        }
        res.status(200).json({
          video:results[0].video
        })
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
} 

const putVideoSetting = async (req, res) =>{
  try{
    const { id, url } = req.query;
    console.log(req.query);
    let query = 'update ajustes set video = ? where ajuste_id = ?';
    sequelize.query(query,[ url,id],(err, results) =>{
      if(err){
        res.status(500).json({
          err
        })
        return
      }
      res.status(201).json({
        msg: 'video actualizado'
      })
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
}

const changeNameSystem = async (req, res) =>{
  try{
    let query= 'update ajustes set nombre =? where ajuste_id = 6';
    sequelize.query(query,[ req.query.nombre    ],(err) =>{
      if(err){
        res.status(500).json({
          err
        })
        return
      }
      res.status(201).json({
        msg: 'Nombre del sistema actualizado'
      })
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getNameSystem = async (req, res)=>{
  try{
    let query = 'select nombre  from ajustes where ajuste_id = 6';
    sequelize.query(query,(err, results) =>{
      if(err){
        res.status(500).json({
          err
        })
        return
      }
      res.status(201).json({
        nombre:results[0].nombre
      })
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};

const getLogoSystem = async (req, res)=>{
  try{
    let query = 'select logo  from ajustes where ajuste_id = 6';
    sequelize.query(query,(err, results) =>{
      if(err){
        res.status(500).json({
          err
        })
        return
      }
      res.status(201).json({
        logo:results[0].logo
      })
    })
  } catch(e) { 
    getError500('error en la consulta!', e, res);
  }
};


router.get("/informacion", isClientFormInfoRegistered);
router.get("/logros", isClientFormAchievements);
router.get("/experiencia", isClientFormExperience);
router.get("/video", isClientVideo);
router.get("/imagen", isClientPhoto);
router.get("/informacionInversionista", isInversorInfo);
router.get("/isInversorPhoto", isInversorPhoto);
router.get("/getFeatured", getFeatured);
router.post("/uploadimageUserCloudinaryHome/:fieldImage", uploadimageUserCloudinaryHome);
router.get("/getAllImageHome/", getAllImageHome);
router.patch("/putTextHome/:text", putTextHome);
router.patch("/putTextPurpose/:text", putTextPurpose);
router.get("/getTextHome/", getTextHome);
router.get("/getImagePartners/", getImagePartners);
router.get("/getTextProposito/", getTextProposito);
router.patch("/savePercentajerUser/:id", savePercentajerUser);
router.get("/total", getTotalInfoUsers);
router.get("/getVideoSettings", getVideoSettings);
router.put("/putVideoSetting", putVideoSetting);
router.put("/changeNameSystem", changeNameSystem);
router.get("/getNameSystem", getNameSystem);
router.get("/getLogoSystem", getLogoSystem);



export default router;
