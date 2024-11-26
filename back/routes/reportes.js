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
  } = req.query;

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
  } = req.query;

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
WHERE inversiones.fecha_deposito 
      BETWEEN '${fecha_inicio}' AND '${fecha_final}'
AND inversiones.inversor_id = ${inversor_id}
ORDER BY inversiones.fecha_deposito DESC;

`;
//   var query = `                              
// SELECT 
//     inversiones.inversion_id, 
//     CONCAT(inversores.nombre, ' ', inversores.apellido) AS inversor, 
//     inversiones.fecha_deposito, 
//     inversiones.monto,
//     CONCAT(clientes.nombre, ' ', clientes.apellido) AS cliente, 
//     inversiones.fecha_devolucion, 
//     (inversiones.ganancia_estimada - inversiones.monto) AS ganancia, 
//     inversiones.estado
// FROM inversiones
// INNER JOIN usuarios AS inversores 
//     ON inversiones.inversor_id = inversores.usuario_id
// INNER JOIN usuarios AS clientes 
//     ON inversiones.cliente_id = clientes.usuario_id
// WHERE inversiones.fecha_deposito >= '${fecha_inicio}'
// AND inversiones.fecha_deposito <= '${fecha_final}'
// AND inversiones.inversor_id = ${inversor_id}
// ORDER BY inversiones.fecha_deposito DESC;
// `;

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
  } = req.query;

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
WHERE inversiones.fecha_deposito 
      BETWEEN '${fecha_inicio}' AND '${fecha_final}'
ORDER BY inversiones.fecha_deposito DESC;
`;
//   var query = `                              
// SELECT 
//     inversiones.inversion_id, 
//     CONCAT(inversores.nombre, ' ', inversores.apellido) AS inversor, 
//     inversiones.fecha_deposito, 
//     inversiones.monto,
//     CONCAT(clientes.nombre, ' ', clientes.apellido) AS cliente, 
//     inversiones.fecha_devolucion, 
//     (inversiones.ganancia_estimada - inversiones.monto) AS ganancia,  
//     inversiones.estado
// FROM inversiones
// INNER JOIN usuarios AS inversores 
//     ON inversiones.inversor_id = inversores.usuario_id
// INNER JOIN usuarios AS clientes 
//     ON inversiones.cliente_id = clientes.usuario_id
// WHERE inversiones.fecha_deposito > '${fecha_inicio}'
// AND inversiones.fecha_deposito < '${fecha_final}'
// AND inversiones.cliente_id = ${cliente_id}
// ORDER BY inversiones.fecha_deposito DESC;
// `;

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

router.get("/reporteSolicitudesGnral", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final
  } = req.query;

  var query = `                              
SELECT solicitudes_retiro.retiro_id, solicitudes_retiro.tipo, 
CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS usuario_nombre,
solicitudes_retiro.fecha_solicitud, solicitudes_retiro.monto_solicitud, solicitudes_retiro.estado,
solicitudes_retiro.fecha_aprobacion,
solicitudes_retiro.monto_recibir
FROM solicitudes_retiro
INNER JOIN usuarios
ON usuarios.usuario_id = solicitudes_retiro.usuario_id
WHERE solicitudes_retiro.fecha_solicitud > '${fecha_inicio}'
AND solicitudes_retiro.fecha_solicitud < '${fecha_final}'
ORDER BY solicitudes_retiro.fecha_solicitud DESC;
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
        message: "Reporte de solicitudes de retiro generado",
      });
    }
  });
});

router.get("/reporteSolicitudesTipo", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final,
    tipo //puede ser 'inversor' o 'cliente'
  } = req.query;

  var query = `                              
SELECT solicitudes_retiro.retiro_id, solicitudes_retiro.tipo, 
CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS usuario_nombre,
solicitudes_retiro.fecha_solicitud, solicitudes_retiro.monto_solicitud, solicitudes_retiro.estado,
solicitudes_retiro.fecha_aprobacion,
solicitudes_retiro.monto_recibir
FROM solicitudes_retiro
INNER JOIN usuarios
ON usuarios.usuario_id = solicitudes_retiro.usuario_id
WHERE solicitudes_retiro.fecha_solicitud > '${fecha_inicio}'
AND solicitudes_retiro.fecha_solicitud < '${fecha_final}'
AND solicitudes_retiro.tipo = '${tipo}'
ORDER BY solicitudes_retiro.fecha_solicitud DESC;
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
        message: "Reporte de solicitudes de retiro generado",
      });
    }
  });
});

router.get("/reporteSolicitudesID", function (req, res, next) {
  const {
    fecha_inicio,
    fecha_final,
    usuario_id // no importa si es cliente o inversor
  } = req.query;

  var query = `                              
SELECT 
    solicitudes_retiro.retiro_id, 
    solicitudes_retiro.tipo, 
    CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS usuario_nombre,
    solicitudes_retiro.fecha_solicitud, 
    solicitudes_retiro.monto_solicitud, 
    solicitudes_retiro.estado,
    solicitudes_retiro.fecha_aprobacion,
    solicitudes_retiro.monto_recibir
FROM solicitudes_retiro
INNER JOIN usuarios
ON usuarios.usuario_id = solicitudes_retiro.usuario_id
WHERE solicitudes_retiro.fecha_solicitud 
      BETWEEN '${fecha_inicio}' AND '${fecha_final}'
AND solicitudes_retiro.usuario_id = '${usuario_id}'
ORDER BY solicitudes_retiro.fecha_solicitud DESC;

`;

//   var query = `                              
// SELECT solicitudes_retiro.retiro_id, solicitudes_retiro.tipo, 
// CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS usuario_nombre,
// solicitudes_retiro.fecha_solicitud, solicitudes_retiro.monto_solicitud, solicitudes_retiro.estado,
// solicitudes_retiro.fecha_aprobacion,
// solicitudes_retiro.monto_recibir
// FROM solicitudes_retiro
// INNER JOIN usuarios
// ON usuarios.usuario_id = solicitudes_retiro.usuario_id
// WHERE solicitudes_retiro.fecha_solicitud >= '${fecha_inicio}'
// AND solicitudes_retiro.fecha_solicitud <= '${fecha_final}'
// AND solicitudes_retiro.usuario_id = '${usuario_id}'
// ORDER BY solicitudes_retiro.fecha_solicitud DESC;
// `;

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
        message: "Reporte de solicitudes de retiro generado",
      });
    }
  });
});

router.get("/reporteInversionesPendientes/", function(req, res, next){
  const {
    fecha_inicio,
    fecha_final,
    cliente_id // no importa si es cliente o inversor
  } = req.query;
  var query = ` 
SELECT 
  inversion_id,
  cliente_id,
  fecha_devolucion,
  monto,
CASE 
  WHEN estado = 1 THEN 'Pendiente'
  WHEN estado = 0 THEN 'Pagado'
  ELSE 'Desconocido'
END AS estado_descripcion
FROM inversiones
WHERE cliente_id = '${cliente_id}'
AND fecha_devolucion BETWEEN '${fecha_inicio}' AND '${fecha_final}' -- Reemplaza con las fechas deseadas
ORDER BY inversion_id DESC;
  `;
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

module.exports = router;
