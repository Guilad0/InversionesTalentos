const connection = require("../database");
var express = require('express');
var router = express.Router();

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

router.post("/", (req, res) => {
    const {autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado}= req.body;
    var posts = `INSERT INTO posts(autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado) VALUES ("${autor_id}", "${categoria_id}", "${titulo}", "${resumen}", "${imagen_portada}", "${fecha_hora}", "${contenido}", "${estado}");`;
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

router.put("/:id", (req, res) => {
    const { autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado } = req.body;
    const { id } = req.params;
    const posts = `UPDATE posts SET autor_id = "${autor_id}", categoria_id = "${categoria_id}", titulo = "${titulo}", resumen = "${resumen}", imagen_portada = "${imagen_portada}", fecha_hora = "${fecha_hora}", contenido = "${contenido}", estado = "${estado}" WHERE id = "${id}";`;
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

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const posts = `DELETE FROM posts WHERE id = "${id}";`;
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

router.patch('/estado/:id', function (req, res, next) {
    // res.send('estas eliminando productos');
    const { autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado } = req.body;
    var query = `UPDATE posts SET estado= !estado WHERE post_id = ${req.params.id};`;

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