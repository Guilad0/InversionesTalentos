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

router.get("/solicitudes_retiros/:id", function (req, res, next) {

  var query = ` SELECT solicitudes_retiro.*, movimientos.tipo
                FROM solicitudes_retiro
                INNER JOIN movimientos
                ON solicitudes_retiro.retiro_id = movimientos.solicitudes_retiro_id
                WHERE solicitudes_retiro.usuario_id = ${req.params.id}
                AND movimientos.tipo = 'Egreso'
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

router.get("/clientes/inversion", function(req, res, next){
  var query = `SELECT inversiones.inversion_id, inversiones.monto, inversiones.fecha_deposito
                FROM inversiones
                INNER JOIN usuarios ON inversiones.cliente_id = usuarios.usuario_id
                WHERE usuarios.rol = 'Cliente'`;
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

router.get("/clientes/retiro", function(req, res, next){
  var query = `SELECT 
                  solicitudes_retiro.retiro_id, 
                  solicitudes_retiro.monto_recibir, 
                  solicitudes_retiro.fecha_solicitud, 
                  solicitudes_retiro.estado, 
                  solicitudes_retiro.fecha_aprobacion
                FROM 
                  solicitudes_retiro
                INNER JOIN 
                  inversiones ON solicitudes_retiro.inversion_id = inversiones.inversion_id
                INNER JOIN 
                  usuarios ON inversiones.cliente_id = usuarios.usuario_id
                WHERE 
                  usuarios.rol = 'Cliente'`;
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


router.get("/clientes", function (req, res, next) {

  var query = ` SELECT * FROM usuarios WHERE rol = 'Cliente';`;
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