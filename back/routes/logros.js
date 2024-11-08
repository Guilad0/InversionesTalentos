const connection = require("../database");
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    var logros = "SELECT * FROM logros";
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
                message: "Lista de logros",
            });
        }
    })
});

router.post("/", (req, res) => {
    const { cliente_id, descripcion, fecha } = req.body; // Agregue fecha aquí
    var logros = `INSERT INTO logros(cliente_id, descripcion, fecha) VALUES ("${cliente_id}", "${descripcion}", "${fecha}");`; 
    
    connection.query(logros, (err, results) => {
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
});


router.put("/:id", (req, res) => {
    const { cliente_id, descripcion } = req.body;
    const { id } = req.params;
    const logros = `UPDATE logros SET cliente_id = "${cliente_id}", descripcion = "${descripcion}" WHERE id = "${id}";`;
    connection.query(logros, (err, results) => {
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
    const logros = `DELETE FROM logros WHERE id = "${id}";`;
    connection.query(logros, (err, results) => {
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
    const { cliente_id,descripcion, estado } = req.body;
    var query = `UPDATE logros SET estado= !estado WHERE logro_id = ${req.params.id};`;

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