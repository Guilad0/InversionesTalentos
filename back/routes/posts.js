const connection = require("../database");
var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)


router.get("/", (req, res) => {
    var logros = "SELECT * FROM posts";
    connection.query(logros, function(err, results)  {
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
        const { titulo, contenido, estado } = req.body;
        const query = `INSERT INTO posts (titulo, contenido, estado) VALUES (?, ?, ?);`;
        connection.query(query, [titulo, contenido, estado], (err, results) => {
            if (err) {
                res.status(500).send({
                    error: err,
                    message: "Error en la petición",
                });
            } else {
                res.status(200).send({
                    message: "Registro exitoso",
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Error en la petición",
        });
    }
});


router.put("/:post_id", (req, res) => {
    const { usuario_id, categoria_id, titulo, resumen, imagen_portada, contenido, estado } = req.body;
    const { post_id } = req.params;
    const posts = `UPDATE posts SET usuario_id = "${usuario_id}", categoria_id = "${categoria_id}", titulo = "${titulo}", resumen = "${resumen}", imagen_portada = "${imagen_portada}", contenido = "${contenido}", estado = "${estado}" WHERE post_id = "${post_id}";`;
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


module.exports = router;

