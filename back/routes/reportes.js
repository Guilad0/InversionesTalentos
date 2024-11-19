var express = require("express");
var router = express.Router();
var connection = require("../database");

router.get("/usuariosCantidad", function (req, res, next) {
  var query = ` SELECT rol, COUNT(*) AS cantidad FROM usuarios GROUP BY rol;`;
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
        message: "Cantidad de usuarios consultados correctamente",
      });
    }
  });
});

router.get("/inversionesCantidad", function (req, res, next) {
  var query = `
  SELECT 
    CASE 
        WHEN estado = 0 THEN 'Saldado' 
        WHEN estado = 1 THEN 'Pendiente' 
        ELSE 'Otro Estado' -- Opcional: para manejar otros posibles valores
    END AS estado_descripcion, 
    COUNT(*) AS cantidad 
FROM inversiones 
GROUP BY estado_descripcion;`;
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
        message: "Cantidad de inversiones consultados correctamente",
      });
    }
  });
});

router.get("/solicitudesCantidad", function (req, res, next) {
  var query = ` SELECT estado, COUNT(*) AS cantidad FROM solicitudes_retiro GROUP BY estado;`;
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
        message: "Cantidad de inversiones consultados correctamente",
      });
    }
  });
});

router.get("/tokensInvertidos", function (req, res, next) {
  var query = ` SELECT SUM(token) as tokens_invertidos FROM movimientos
WHERE descripcion = 'Tokens invertidos';`;
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
        message: "Cantidad de inversiones consultados correctamente",
      });
    }
  });
});

router.get("/sumaComisiones", function (req, res, next) {
  var query = `SELECT estado,SUM(comision_aplicar) AS total_comisiones FROM solicitudes_retiro GROUP BY estado;`;
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
        message: "Cantidad de inversiones consultados correctamente",
      });
    }
  });
});

router.get("/totalCompras", function (req, res, next) {
  var anho = new Date().getFullYear();

  var queryCompraTokens = `
                SELECT SUM(token) as tokens_comprados, MONTH(fecha_solicitud) AS mes
                FROM movimientos
                WHERE YEAR(fecha_solicitud) = ${anho} 
                AND descripcion = 'Compra de tokens'
                GROUP BY MONTH(fecha_solicitud);
                `;

  connection.query(queryCompraTokens, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Total compras por mes",
      });
    }
  });
});

router.get("/totalInversiones", function (req, res, next) {
  var anho = new Date().getFullYear();

  var queryInversionToken = `
                SELECT SUM(token) as tokens_invertidos, MONTH(fecha_solicitud) AS mes
                FROM movimientos
                WHERE YEAR(fecha_solicitud) = ${anho} 
                AND descripcion = 'Tokens invertidos'
                GROUP BY MONTH(fecha_solicitud);
  `;

  connection.query(queryInversionToken, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Total inversiones por mes",
      });
    }
  });
});

router.get("/gananciasPendientes", function (req, res, next) {
  var anho = new Date().getFullYear();

  var query = `                              
SELECT 
    estado, 
    MONTH(fecha_solicitud) AS mes, 
    SUM(comision_aplicar) AS total_comisiones
FROM 
    solicitudes_retiro
WHERE 
    YEAR(fecha_solicitud) = 2024
AND estado = 'Pendiente'
GROUP BY MONTH(fecha_solicitud);
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Ganacias por mes",
      });
    }
  });
});

router.get("/gananciasAprobadas", function (req, res, next) {
  var anho = new Date().getFullYear();

  var query = `                              
SELECT 
    estado, 
    MONTH(fecha_solicitud) AS mes, 
    SUM(comision_aplicar) AS total_comisiones
FROM 
    solicitudes_retiro
WHERE 
    YEAR(fecha_solicitud) = 2024
AND estado = 'Aprobado'
GROUP BY MONTH(fecha_solicitud);
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Ganacias por mes",
      });
    }
  });
});

router.get("/gananciasAprobadas", function (req, res, next) {
  var anho = new Date().getFullYear();

  var query = `                              
SELECT 
    estado, 
    MONTH(fecha_solicitud) AS mes, 
    SUM(comision_aplicar) AS total_comisiones
FROM 
    solicitudes_retiro
WHERE 
    YEAR(fecha_solicitud) = 2024
AND estado = 'Aprobado'
GROUP BY MONTH(fecha_solicitud);
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Ganacias por mes",
      });
    }
  });
});

router.get("/reporteInversionesGnral", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final
  } = req.body;

  var query = `                              
SELECT 
    inversiones.inversion_id, 
    CONCAT(inversores.nombre, ' ', inversores.apellido) AS inversor, 
    inversiones.fecha_deposito, 
    inversiones.monto,
    CONCAT(clientes.nombre, ' ', clientes.apellido) AS cliente, 
    inversiones.fecha_devolucion, 
    (inversiones.ganancia_estimada - inversiones.monto) AS ganancia, 
    inversiones.estado
FROM inversiones
INNER JOIN usuarios AS inversores 
    ON inversiones.inversor_id = inversores.usuario_id
INNER JOIN usuarios AS clientes 
    ON inversiones.cliente_id = clientes.usuario_id
WHERE inversiones.fecha_deposito > '${fecha_inicio}'
AND inversiones.fecha_deposito < '${fecha_final}'
ORDER BY inversiones.fecha_deposito DESC;
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Reporte de inversiones generado",
      });
    }
  });
});

router.get("/reporteInversionesInversor", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final,
    inversor_id
  } = req.body;

  var query = `                              
SELECT 
    inversiones.inversion_id, 
    CONCAT(inversores.nombre, ' ', inversores.apellido) AS inversor, 
    inversiones.fecha_deposito, 
    inversiones.monto,
    CONCAT(clientes.nombre, ' ', clientes.apellido) AS cliente, 
    inversiones.fecha_devolucion, 
    (inversiones.ganancia_estimada - inversiones.monto) AS ganancia, 
    inversiones.estado
FROM inversiones
INNER JOIN usuarios AS inversores 
    ON inversiones.inversor_id = inversores.usuario_id
INNER JOIN usuarios AS clientes 
    ON inversiones.cliente_id = clientes.usuario_id
WHERE inversiones.fecha_deposito > '${fecha_inicio}'
AND inversiones.fecha_deposito < '${fecha_final}'
AND inversiones.inversor_id = ${inversor_id}
ORDER BY inversiones.fecha_deposito DESC;
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Reporte de inversiones generado",
      });
    }
  });
});

router.get("/reporteInversionesCliente", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final,
    cliente_id
  } = req.body;

  var query = `                              
SELECT 
    inversiones.inversion_id, 
    CONCAT(inversores.nombre, ' ', inversores.apellido) AS inversor, 
    inversiones.fecha_deposito, 
    inversiones.monto,
    CONCAT(clientes.nombre, ' ', clientes.apellido) AS cliente, 
    inversiones.fecha_devolucion, 
    (inversiones.ganancia_estimada - inversiones.monto) AS ganancia,  
    inversiones.estado
FROM inversiones
INNER JOIN usuarios AS inversores 
    ON inversiones.inversor_id = inversores.usuario_id
INNER JOIN usuarios AS clientes 
    ON inversiones.cliente_id = clientes.usuario_id
WHERE inversiones.fecha_deposito > '${fecha_inicio}'
AND inversiones.fecha_deposito < '${fecha_final}'
AND inversiones.cliente_id = ${cliente_id}
ORDER BY inversiones.fecha_deposito DESC;
`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        error: error,
        message: "Error al realizar la petición",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Reporte de inversiones generado",
      });
    }
  });
});

module.exports = router;
