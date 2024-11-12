var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/valores", function (req, res, next) {
  var query = ` SELECT valor_token, tiempo_minimo_inversion as tiempo_inversion, comision_porcentual_ganancia AS porcentaje_inversion, comision_porcentual_retiro AS comision_retiros
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
  const { usuario_id, tokens, monto, tipo, descripcion } = req.body;

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
  const {
    usuario_id,
    cliente_id,
    inversor_id,
    monto,
    token,
    tipo,
    descripcion,
    ganancia_estimada,
    fecha_devolucion,
  } = req.body;

  var query = ` INSERT INTO inversiones (cliente_id, inversor_id, monto, fecha_deposito, ganancia_estimada, fecha_devolucion)
                VALUES ('${cliente_id}', '${inversor_id}', '${monto}', CURRENT_TIMESTAMP(), '${ganancia_estimada}', '${fecha_devolucion}');`;

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

      connection.query(
        queryTokenInversionista,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res.status(500).send({
              error: error,
              message: "Error al realizar la petición",
            });
          } else {
            var queryTokenCliente = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
          VALUES ('Ingreso', 'Inversión recibida', CURRENT_TIMESTAMP(), NULL, '${token}', '${cliente_id}', '${inversion_id}', NULL);`;

            connection.query(
              queryTokenCliente,
              function (error, results, fields) {
                if (error) {
                  console.log(error);
                  res.status(500).send({
                    error: error,
                    message: "Error al realizar la petición",
                  });
                }
              }
            );
          }
        }
      );
      res.status(200).send({
        data: results.insertId,
        message: "inversion realizada",
      });
    }
  });
});

router.get("/tokensClienteRecibido/:id", function (req, res, next) {
  var query = `SELECT 
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

router.post("/solicitarRetiro", function (req, res, next) {
  const {
    tipo,
    usuario_id,
    monto_solicitud,
    tokens_cambio,
    comision_aplicar,
    monto_recibir,
    estado,
  } = req.body;

  var query = ` INSERT INTO solicitudes_retiro (tipo, usuario_id, monto_solicitud, tokens_cambio, comision_aplicar, monto_recibir, estado, fecha_solicitud)
                VALUES ('${tipo}', '${usuario_id}', '${monto_solicitud}', '${tokens_cambio}', '${comision_aplicar}', '${monto_recibir}', '${estado}', CURRENT_TIMESTAMP());`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      const solicitud_id = results.insertId;
      var queryMovimientoToken = ` INSERT INTO movimientos (tipo, descripcion, fecha_solicitud, fecha_desembolso, token, usuario_id, inversiones_id, solicitudes_retiro_id)
                                      VALUES ('Egreso', 'Por solicitud de retiro', CURRENT_TIMESTAMP(), NULL, '${tokens_cambio}', '${usuario_id}', NULL, '${solicitud_id}');`;

      connection.query(
        queryMovimientoToken,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res.status(500).send({
              error: error,
              message: "Error al realizar la petición",
            });
          }else {
              res.status(200).send({
                data: results,
                message: "Solicitud realizada correctamente",
              });
            }
        }
      );
    }
  });
});

module.exports = router;
