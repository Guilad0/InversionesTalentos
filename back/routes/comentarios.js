const connection = require("../database");
var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);


router.get("/", (req, res) => {
    var logros = "SELECT * FROM comentarios";
    connection.query(logros, function (err, results) {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error en la petición",
            });
        } else {
            res.status(200).json({
                data: results,
                message: "Lista de comentarios",
            });
        }
    });
});


router.post("/", (req, res) => {
    const { cliente_id, inversor_id, comentario, calificacion } = req.body;

    const query = `
        INSERT INTO comentarios (cliente_id, inversor_id, comentario, calificacion, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    connection.query(query, [cliente_id, inversor_id, comentario, calificacion], (err, result) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error al insertar el comentario",
            });
        } else {
            res.status(201).send({
                message: "Comentario insertado con éxito",
                data: result,
            });
        }
    });
});

module.exports = router;
