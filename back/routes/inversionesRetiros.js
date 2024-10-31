var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/inversionista/:id", function (req, res, next) {

  var query = ` SELECT inversiones.*, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_cliente  
                FROM inversiones
                INNER JOIN usuarios
                ON inversiones.cliente_id = usuarios.usuario_id
                WHERE inversiones.inversor_id = ${req.params.id}
                ORDER BY inversiones.inversion_id DESC;`;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      res.status(200).send({
        data: results,
        message: "Inversiones consultadas correctamente",
      });
    }
  });
});

router.get("/cliente/:id", function (req, res, next) {

  var query = ` SELECT inversiones.*, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_inversor
                FROM inversiones
                INNER JOIN usuarios
                ON inversiones.inversor_id = usuarios.usuario_id
                WHERE inversiones.cliente_id = ${req.params.id}
                ORDER BY inversiones.inversion_id DESC;`;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      res.status(200).send({
        data: results,
        message: "Inversiones consultadas correctamente",
      });
    }
  });
});

router.get("/inversionista_retiros/:id", function (req, res, next) {

  var query = ` SELECT solicitudes_retiro.*, movimientos.tipo
                FROM solicitudes_retiro
                INNER JOIN movimientos
                ON solicitudes_retiro.retiro_id = movimientos.solicitudes_retiro_id
                WHERE solicitudes_retiro.usuario_id = ${req.params.id}
                AND movimientos.tipo = 'Egreso'
                AND movimientos.monto IS NOT NULL 
                ORDER BY solicitudes_retiro.retiro_id DESC;`;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      res.status(200).send({
        data: results,
        message: "Solicitudes de retiro consultadas correctamente",
      });
    }
  });
});

router.get("/cliente_retiros/:id", function(req, res, next){
  var query = ` SELECT solicitudes_retiro.*, movimientos.tipo
                FROM solicitudes_retiro
                INNER JOIN movimientos
                ON solicitudes_retiro.retiro_id = movimientos.solicitudes_retiro_id
                WHERE solicitudes_retiro.usuario_id = ${req.params.id}
                AND movimientos.tipo = 'Egreso'
                AND movimientos.monto IS NOT NULL 
                ORDER BY solicitudes_retiro.retiro_id DESC;`;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Inversiones consultadas correctamente",
        
      });
    }
  });
});

module.exports = router;