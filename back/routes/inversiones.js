var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/", function (req, res, next) {

  var query = `SELECT * FROM inversiones`;
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

router.post("/", function (req, res, next) {
  const {cliente_id, inversor_id, monto, tipo_ganancia, ganancia_estimada, fecha_deposito} = req.body;

  var query = ` INSERT INTO inversiones (cliente_id, inversor_id, monto, tipo_ganancia, ganancia_estimada, fecha_deposito)
                VALUES ('${cliente_id}', '${inversor_id}', '${monto}', '${tipo_ganancia}', '${ganancia_estimada}', CURRENT_TIMESTAMP());`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results.insertId);
      res.status(200).send({
        data: results.insertId,
        message: "Producto insertado correctamente",
      });
    }
  });
});

router.put("/:id", function (req, res, next) {
  const {cliente_id, inversor_id, monto, tipo_ganancia, ganancia_estimada} = req.body;

  var query = `UPDATE inversiones SET 
  cliente_id = '${cliente_id}', inversor_id = '${inversor_id}',
  monto = '${monto}', tipo_ganancia = '${tipo_ganancia}',
  ganancia_estimada= '${ganancia_estimada}'
  WHERE inversion_id = '${req.params.id}';`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results.insertId);
      res.status(200).send({
        data: results.insertId,
        message: "Inversión actualizado correctamente",
      });
    }
  });
});

router.patch("/:id", function (req, res, next) {
  const {estado} = req.body;
  var query = `UPDATE inversiones SET 
  estado = 'Eliminado'
  WHERE inversion_id = '${req.params.id}';`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results.insertId);
      res.status(200).send({
        data: results.insertId,
        message: "Estado de inversión: Eliminado",
      });
    }
  });
});

module.exports = router;
