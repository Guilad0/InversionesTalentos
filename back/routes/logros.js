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
    const {cliente_id, descripcion}= req.body;
    var logros = `INSERT INTO logros(cliente_id, descripcion) VALUES ("${cliente_id}", "${descripcion}");`;
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

module.exports = router;