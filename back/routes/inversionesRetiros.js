var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/inversionista/:id", function (req, res, next) {

  var query = ` SELECT inversiones.*, usuarios.imagen, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_cliente
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

  var query = ` SELECT inversiones.*, usuarios.imagen, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_inversor
                FROM inversiones
                INNER JOIN usuarios
                ON inversiones.inversor_id = usuarios.usuario_id
                WHERE inversiones.cliente_id = ${req.params.id}
                AND inversiones.estado = 1
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

  var query = ` SELECT *
                FROM solicitudes_retiro                
                WHERE usuario_id = ${req.params.id}
                ORDER BY retiro_id DESC;`;
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
  var query = ` SELECT *
                FROM solicitudes_retiro                
                WHERE usuario_id = ${req.params.id}
                ORDER BY retiro_id DESC;`;
  connection.query(query, function (error, results) {
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

router.get("/inversiones_vencidas/:id", function(req, res, next){
  var query = ` SELECT *
                FROM inversiones                
                WHERE cliente_id = ${req.params.id}
                AND fecha_devolucion <= CURRENT_DATE()
                AND estado = 1
                ORDER BY inversion_id DESC;`;
  connection.query(query, function (error, results) {
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
        message: "Inversiones pendientes consultadas correctamente",
        
      });
    }
  });
});

router.get("/tokensClienteRecibido/:id", function (req, res, next) {

  var query = `
  SELECT 
    SUM(inversiones.monto) AS totalTokensRecibidos, 
    SUM(inversiones.ganancia_estimada) AS totalTokensDeudas,
    (
        SELECT SUM(movimientos.token)
        FROM movimientos
        WHERE movimientos.usuario_id = ${req.params.id}
        AND movimientos.descripcion = 'Compra de tokens'
    ) AS tokensCompradosCliente
  FROM inversiones
  WHERE inversiones.cliente_id = ${req.params.id};`;
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
        message: "Tokens del inversionista consultada correctamente",
      });
    }
  });
});

router.post("/devolverTokens", function (req, res, next) {
  const {inversion_id,usuario_id, cliente_id, inversor_id,  token,  tipo, descripcion } = req.body;

  var query = ` UPDATE inversiones 
                SET estado=!estado 
                WHERE inversion_id = '${inversion_id}';`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      var queryTokenCliente = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
                VALUES ('${tipo}', '${descripcion}', CURRENT_TIMESTAMP(), NULL, '${token}', '${cliente_id}', '${inversion_id}', NULL);`;

      connection.query(queryTokenCliente, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).send({
            error: error,
            message: "Error al realizar la petición",
          });
        }
        else{
          var queryTokenInversionista = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
          VALUES ('Ingreso', 'Ganancia de tokens invertidos', CURRENT_TIMESTAMP(), NULL, '${token}', '${inversor_id}', '${inversion_id}', NULL);`;

            connection.query(queryTokenInversionista, function (error, results, fields) {
              if (error) {
                console.log(error);
                res.status(500).send({
                  error: error,
                  message: "Error al realizar la petición",
                });
              }
            })
        }
      })
      res.status(200).send({
        data: results.insertId,
        message: "Devolución de tokens realizada correctamente",
      });
    }
  });
});

module.exports = router;