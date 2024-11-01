var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/valorToken", function (req, res, next) {

  var query = ` SELECT valor_token
                FROM ajustes
                WHERE valor_token IS NOT NULL
                ORDER BY ajuste_id DESC LIMIT 1;`;
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
        message: "Valor del token consultada correctamente",
      });
    }
  });
});

router.post("/comprarTokens", function (req, res, next) {
  const {usuario_id, tokens, monto, tipo, descripcion} = req.body;

  var query = ` INSERT INTO movimientos (tipo, monto, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
                VALUES ('${tipo}', '${monto}', '${descripcion}', CURRENT_TIMESTAMP(), NULL, '${tokens}', '${usuario_id}', NULL, NULL);`;

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
        message: "Tokens comprados correctamente",
      });
    }
  });
});

router.get("/dolaresInversionista/:id", function (req, res, next) {

  var query = ` SELECT SUM(monto) as totalUsd
                FROM movimientos
                WHERE usuario_id =${req.params.id};`;
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
        message: "Dólares del inversionista consultada correctamente",
      });
    }
  });
});

router.get("/tokensInversionistaComprados/:id", function (req, res, next) {

  var query = ` SELECT SUM(token) as totalTokensComprados
                FROM movimientos
                WHERE usuario_id =${req.params.id}
                AND tipo = 'Ingreso';`;
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

router.get("/tokensInversionistaInvertidos/:id", function (req, res, next) {

  var query = ` SELECT SUM(token) as totalTokensInvertidos
                FROM movimientos
                WHERE usuario_id =${req.params.id}
                AND tipo = 'Egreso';`;
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

router.get("/clientes", function (req, res, next) {

  var query = ` SELECT * FROM usuarios WHERE rol = 'Cliente';`;
  connection.query(query, function (error, results) {
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

router.post("/invertirTokens", function (req, res, next) {
  const {usuario_id, cliente_id, inversor_id, monto, token,  tipo, descripcion} = req.body;

  var query = ` INSERT INTO inversiones (cliente_id, inversor_id, monto, fecha_deposito)
                VALUES ('${cliente_id}', '${inversor_id}', '${monto}', CURRENT_TIMESTAMP());`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results.insertId);
      const inversion_id = results.insertId;
      var queryTokenInversionista = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
                VALUES ('${tipo}', '${descripcion}', CURRENT_TIMESTAMP(), NULL, '${token}', '${usuario_id}', '${inversion_id}', NULL);`;

      connection.query(queryTokenInversionista, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).send({
            error: error,
            message: "Error al realizar la petición",
          });
        }
        else{
          var queryTokenCliente = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
          VALUES ('Ingreso', 'Inversión recibida', CURRENT_TIMESTAMP(), NULL, '${token}', '${cliente_id}', '${inversion_id}', NULL);`;

            connection.query(queryTokenCliente, function (error, results, fields) {
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
        message: "inversion realizada",
      });
    }
  });
});

router.get("/tokensClienteRecibido/:id", function (req, res, next) {

  var query = ` SELECT SUM(token) as totalTokensRecibidos
                FROM movimientos
                WHERE usuario_id =${req.params.id}
                AND tipo = 'Ingreso';`;
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

module.exports = router;