var express = require('express');
var router = express.Router();
//importamos la coneccion a la base de datos
var conexion = require('../database');



/* GET listar faq. */
router.get('/', function (req, res, next) {

    console.log('Peticion de codigos');

    //creamos la consulta  
    var query = 'SELECT * FROM faq;';
    //ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            })
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'Listado de faq'
            });
        }
    });
});


// POSTEAR faq
router.post('/', function (req, res, next) {
    const { pregunta, respuesta, } = req.body; // No necesitas created_at ni updated_at

    var query = `INSERT INTO faq (pregunta, respuesta, created_at, updated_at) 
                  VALUES ("${pregunta}", "${respuesta}",  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`;

    // ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            console.log(results.insertId);
            res.status(200).send({
                data: results.insertId,
                message: 'FAQ registrado exitosamente'
            });
        }
    });
});


// PUT actualizar faq
router.put('/:id', function (req, res, next) {
    const { pregunta, respuesta, } = req.body;

    var query = `UPDATE faq SET 
                    pregunta = "${pregunta}",
                    respuesta = "${respuesta}",
                    
                    updated_at = CURRENT_TIMESTAMP()
                WHERE faq_id = ${req.params.id};`;

    // Ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'FAQ actualizado exitosamente'
            });
        }
    });
});

//DELETE eliminar links
router.delete('/:id', function (req, res, next) {
    var query = `UPDATE faq SET eliminado = 1 WHERE faq_id = ?`;

    // Ejecutamos la consulta
    conexion.query(query, [req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'faq eliminado lógicamente'
            });
        }
    });
});

// RUTA PARA RESTABLECER ELIMINACIÓN LÓGICA
router.patch('/:id/restaurar', function (req, res, next) {
    var query = `UPDATE faq SET eliminado = 0 WHERE faq_id = ?`;

    // Ejecutamos la consulta
    conexion.query(query, [req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results,
                message: 'faq restaurado correctamente'
            });
        }
    });
});

 


module.exports = router;