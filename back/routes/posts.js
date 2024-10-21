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

router.post("/", async(req, res) => {
    try {
    const { tempFilePath } = req.files.imagen_portada;
    const result = await cloudinary.uploader.upload(tempFilePath, {
            public_id: `posts/${Date.now()}`,
            folder: 'posts'
    });
    const { secure_url } = result;
    const {autor_id, categoria_id, titulo, resumen, contenido, estado}= req.body;
    var posts = `INSERT INTO posts(autor_id, categoria_id, titulo, resumen, imagen_portada, contenido, estado) VALUES ("${autor_id}", "${categoria_id}", "${titulo}", "${resumen}", "${secure_url}", "${contenido}", "${estado}");`;
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

router.put("/:post_id", (req, res) => {
    const { autor_id, categoria_id, titulo, resumen, imagen_portada, contenido, estado } = req.body;
    const { post_id } = req.params;
    const posts = `UPDATE posts SET autor_id = "${autor_id}", categoria_id = "${categoria_id}", titulo = "${titulo}", resumen = "${resumen}", imagen_portada = "${imagen_portada}", contenido = "${contenido}", estado = "${estado}" WHERE post_id = "${post_id}";`;
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

router.patch('/estado/:post_id', function (req, res, next) {
    // res.send('estas eliminando productos');
    const { autor_id, categoria_id, titulo, resumen, imagen_portada, contenido, estado } = req.body;
    var query = `UPDATE posts SET estado= !estado WHERE post_id = ${req.params.post_id};`;

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            });
        } else {
            console.log(req.results);
            res.status(200).send({
                data: results,
                message: 'Estado actualizado correctamente'
            });
        }
    })
});

module.exports = router;

