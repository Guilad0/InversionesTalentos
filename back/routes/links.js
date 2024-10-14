var express = require('express');
var router = express.Router();
//importamos la coneccion a la base de datos
var conexion = require('../database');



/* GET listar links. */
router.get('/', function (req, res, next) {

    console.log('Peticion de codigos');

    //creamos la consulta  
    var query = 'SELECT * FROM links;';
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
                message: 'Listado de links'
            });
        }
    });
});


//POSTEAR links
router.post('/', function (req, res, next) {

    const { cliente_id, nombre, link, descripcion, estado } = req.body;

    var query = `INSERT INTO links (cliente_id, nombre, link, descripcion, estado) 
                  VALUES ("${cliente_id}", "${nombre}", "${link}", "${descripcion}", "${estado}");`;

    //ejecutamos la consulta
    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            })
        } else {
            console.log(results.insertId);
            res.status(200).send({
                data: results.insertId,
                message: 'link registrado exitosamente'
            })
        }
    });
});

// PUT actualizar links
router.put('/:id', function (req, res, next) {
    const { cliente_id, nombre, link, descripcion,estado } = req.body;

    var query = `UPDATE links SET 
                    cliente_id = "${cliente_id}",
                    nombre = "${nombre}",
                    link = "${link}",
                    descripcion = "${descripcion}",
                    estado = "${estado}"                                       
                WHERE link_id = ${req.params.id};`;

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
                message: 'Link actualizado exitosamente'
            });
        }
    });
});

//DELETE eliminar links
router.delete('/:id', function (req, res, next) {
    var query = `UPDATE links SET eliminado = 1 WHERE link_id = ?`;

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
                message: 'link eliminado lógicamente'
            });
        }
    });
});

  
   // PUT Cambia el estado
router.put('/estado/:id', function (req, res, next) {
    const id = req.params.id;
    const nuevoEstado = req.body.estado;

    var query = 'UPDATE links SET estado = ? WHERE link_id = ?;';

    // ejecutamos la consulta con parámetros
    conexion.query(query, [nuevoEstado, id], function (error, results, fields) {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).send({
                error: 'Error al realizar la petición',
                details: error
            });
        }
        res.status(200).send({
            data: results,
            message: 'Estado actualizado correctamente'
        });
    });
});


module.exports = router;