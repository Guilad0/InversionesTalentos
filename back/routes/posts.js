const connection = require("../database");
var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)


router.get("/", (req, res) => {
    var logros = "SELECT * FROM posts";
    connection.query(logros, function (err, results) {
        if (err) {
            //console.log(err);
            res.status(500).send({
                error: err,
                message: "Error en la peticion",
            });
        } else {
            //console.log(result);
            res.status(200).json({
                data: results,
                message: "Lista de posts",
            });
        }
    })
});

router.post("/", async (req, res) => {
    try {
        const { tempFilePath } = req.files.imagen_portada;
        const result = await cloudinary.uploader.upload(tempFilePath, {
            public_id: `posts/${Date.now()}`,
            folder: 'posts'
        });
        const { secure_url } = result;
        const { titulo, contenido, estado } = req.body;
        var posts = `INSERT INTO posts(titulo, imagen_portada, contenido, estado) VALUES ("${titulo}", "${secure_url}", "${contenido}", "${estado}");`;
        connection.query(posts, (err, results) => {
            if (err) {
                //console.log(err);
                res.status(500).send({
                    error: err,
                    message: "Error en la peticion",
                });
            } else {
                //console.log(result);
                res.status(200).send({
                    message: "Registro exitoso",
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error,
            message: "Error en la peticion",
        });
    }
});


router.put("/:post_id", async (req, res) => {
    try {
      let secure_url;
      // Verificar si se cargó una imagen
      if (req.files && req.files.imagen_portada) {
        const { tempFilePath } = req.files.imagen_portada;
        const result = await cloudinary.uploader.upload(tempFilePath, {
          public_id: `posts/${Date.now()}`,
          folder: 'posts',
        });
        secure_url = result.secure_url;
      }
  
      const { titulo, contenido, estado } = req.body;
      const { post_id } = req.params;
      const posts = `UPDATE posts SET titulo = "${titulo}", 
                      ${secure_url ? `imagen_portada = "${secure_url}",` : ""}
                      contenido = "${contenido}", estado = "${estado}" 
                      WHERE post_id = "${post_id}";`;
      connection.query(posts, (err, results) => {
        if (err) {
          console.error("Error en la actualización de post:", err);
          return res.status(500).send({
            error: err,
            message: "Error en la petición",
          });
        }
        res.status(200).send({
          message: "Post actualizado exitosamente",
        });
      });
    } catch (error) {
      console.error("Error en la actualización de post:", error);
      res.status(500).send({
        error: error,
        message: "Error en la petición",
      });
    }
  });
  

router.delete("/:post_id", (req, res) => {
    const { post_id } = req.params;
    const posts = `DELETE FROM posts WHERE post_id = "${post_id}";`;
    connection.query(posts, (err, results) => {
        if (err) {
            //console.log(err);
            res.status(500).send({
                error: err,
                message: "Error en la peticion",
            });
        } else {
            //console.log(result);
            res.status(200).send({
                message: "Registro exitoso",
            });
        }
    })
});

router.patch('/estado/:post_id', (req, res) => {
    const { post_id } = req.params;
    const query = `UPDATE posts SET estado = IF(estado = 'Activo', 'Inactivo', 'Activo') WHERE post_id = ?`;
    connection.query(query, [post_id], (error, results) => {
        if (error) {
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            res.status(200).send({
                data: results,
                message: 'Estado actualizado correctamente'
            });
        }
    });
});

router.get("/activos", (req, res) => {
    const query = "SELECT * FROM posts WHERE estado = 'Activo'";
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error en la petición",
            });
        } else {
            res.status(200).json({
                data: results,
                message: "Lista de posts activos",
            });
        }
    });
});

router.get("/:post_id", (req, res) => {
    const { post_id } = req.params;
    const query = `SELECT * FROM posts WHERE post_id = ?`;
    connection.query(query, [post_id], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error en la petición",
            });
        } else if (results.length === 0) {
            res.status(404).send({
                message: "Post no encontrado",
            });
        } else {
            res.status(200).json({
                data: results[0],
                message: "Post encontrado",
            });
        }
    });
});
module.exports = router;

