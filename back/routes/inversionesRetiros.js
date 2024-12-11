var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/inversiones", function (req, res, next) {
  // Parámetros de paginación y búsqueda
  const porPagina = 10; // Número de resultados por página
  const pagina = parseInt(req.query.page, 10) || 1; // Página actual
  const salto = (pagina - 1) * porPagina; // Calcular el número de resultados a saltar
  const limite = `${salto}, ${porPagina}`; // Límite para la consulta SQL
  
  // Consulta para contar el número total de filas
  const queryFilas = `SELECT COUNT(*) AS numFilas
                      FROM inversiones
                      INNER JOIN usuarios ON inversiones.cliente_id = usuarios.usuario_id;`;
  
  connection.query(queryFilas, (err, results) => {
    if (err) {
      return res.status(500).json({
        err,
        msg: "Error al contar las filas",
      });
    }
    
    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);
    
    // Consulta para obtener los datos con paginación
    const query = `SELECT inversiones.*, usuarios.imagen, 
                  CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_cliente,
                  DATE_FORMAT(inversiones.fecha_deposito, '%Y-%m-%d') AS fecha_inversion,
                  DATE_FORMAT(inversiones.fecha_devolucion, '%Y-%m-%d') AS fecha_retorno
                  FROM inversiones
                  INNER JOIN usuarios ON inversiones.cliente_id = usuarios.usuario_id
                  ORDER BY inversiones.inversion_id DESC
                  LIMIT ${limite};`;

    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          err,
          msg: "Error al obtener las inversiones",
        });
      }

      const paginas = Array.from({ length: numPaginas }, (_, i) => i + 1);

      const paginacion = {
        total: numFilas,
        current: pagina,
        pages: paginas,
        perPage: porPagina,
        previous: pagina > 1 ? pagina - 1 : null,
        next: pagina < numPaginas ? pagina + 1 : null,
      };

      res.status(200).json({
        results,
        paginacion,
        message: "Inversiones consultadas correctamente",
      });
    });
  });
});

// Ruta para actualizar el estado de una inversión
router.put("/inversion/:id", function (req, res, next) {
  var query = `UPDATE inversiones SET estado = ? WHERE inversion_id = ?`;
  var estado = req.body.estado;  // Este valor debe ser 0 o 1
  var inversionId = req.params.id;

  // Verificación de que el estado sea un valor booleano válido
  if (estado !== 0 && estado !== 1) {
    return res.status(400).send({
      message: "El valor del estado debe ser 0 o 1",
    });
  }

  connection.query(query, [estado, inversionId], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al actualizar el estado de la inversión",
      });
    } else {
      res.status(200).send({
        data: results,
        message: "Estado de la inversión actualizado correctamente",
      });
    }
  });
});


router.get("/inversionista/:id", function (req, res, next) {

  var query = ` SELECT inversiones.*, usuarios.imagen, 
CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_cliente,
DATE_FORMAT(inversiones.fecha_deposito, '%Y-%m-%d') AS fecha_inversion,
DATE_FORMAT(inversiones.fecha_devolucion, '%Y-%m-%d') AS fecha_retorno
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

  var query = ` SELECT inversiones.inversion_id, inversiones.cliente_id, inversiones.inversor_id, inversiones.monto, inversiones.ganancia_estimada,
DATE_FORMAT(inversiones.fecha_deposito, '%Y-%m-%d') AS fecha_deposito,
DATE_FORMAT(inversiones.fecha_devolucion, '%Y-%m-%d') AS fecha_devolucion,
inversiones.estado,
usuarios.imagen, 
CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre_inversor
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

  var query = ` 
SELECT retiro_id, tipo, usuario_id, monto_solicitud, tokens_cambio, comision_aplicar, monto_recibir, estado,
DATE_FORMAT(fecha_solicitud, '%Y-%m-%d') AS fecha_solicitud,
DATE_FORMAT(fecha_aprobacion, '%Y-%m-%d') AS fecha_aprobacion
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
  var query = ` 
  SELECT retiro_id, tipo, usuario_id, monto_solicitud, tokens_cambio, comision_aplicar, monto_recibir, estado,
DATE_FORMAT(fecha_solicitud, '%Y-%m-%d') AS fecha_solicitud,
DATE_FORMAT(fecha_aprobacion, '%Y-%m-%d') AS fecha_aprobacion
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
        message: "Retiros consultadas correctamente",
        
      });
    }
  });
});

router.get("/inversiones_vencidas/:id", function(req, res, next){
  var query = ` 
  SELECT inversion_id, cliente_id, inversor_id, monto, tipo_ganancia, ganancia_estimada, estado,
  DATE_FORMAT(fecha_deposito, '%Y-%m-%d') AS fecha_deposito,
  DATE_FORMAT(fecha_devolucion, '%Y-%m-%d') AS fecha_devolucion
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