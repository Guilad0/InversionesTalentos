var express = require("express");
var router = express.Router();

//importamos la conexión a la base de datos

var connection = require("../database");


router.get("/", function (req, res, next) {
  var numFilas;
  var porPagina = 10;
  var pagina = parseInt(req.query.page, 10) || 1;
  var busqueda = req.query.search || ''; 
  var numPaginas;
  var salto = (pagina - 1) * porPagina;
  var limite = salto + ',' + porPagina;

  var queryFilas = `SELECT COUNT(*) AS numFilas
              FROM solicitudes_retiro
              INNER JOIN usuarios ON solicitudes_retiro.usuario_id = usuarios.usuario_id
              INNER JOIN inversiones ON solicitudes_retiro.inversion_id = inversiones.inversion_id
              WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%';`; 

  connection.query(queryFilas, function (error, results, fields) {
      numFilas = results[0].numFilas;
      numPaginas = Math.ceil(numFilas / porPagina);
      var query = `SELECT solicitudes_retiro.*, concat(usuarios.nombre, ' ', usuarios.apellido , ' - ', usuarios.rol) as username, usuarios.usuario_id, inversiones.inversion_id
                   FROM solicitudes_retiro
                   INNER JOIN usuarios ON solicitudes_retiro.usuario_id = usuarios.usuario_id
                   INNER JOIN inversiones ON solicitudes_retiro.inversion_id = inversiones.inversion_id
                   WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
                   LIMIT ${limite};`; 

      connection.query(query, function (error, results, fields) {
          if (error) {
              console.log(error);
              res.status(500).send({
                  error: error,
                  message: "Error al realizar la petición",
              });
          } else {
              console.log(results);
              var paginas = Array.from({ length: numPaginas }, (_, i) => i + 1);

              var paginacion = {
                  total: numFilas,
                  current: pagina,
                  pages: paginas,
                  perPage: porPagina,
                  previous: (pagina > 1) ? (pagina - 1) : null,
                  next: (pagina < numPaginas) ? (pagina + 1) : null,
              };
              res.status(200).send({
                  pagination: paginacion,
                  data: results,
                  message: 'Listando clientes',
              });
          }
      });
  });
});


router.post("/", function (req, res, next) {
  const { tipo, usuario_id, monto_solicitud, comision_aplicar, monto_recibir, fecha_solicitud,
    fecha_aprobacion, foto_identificacion, selfie_identificacion, estado, inversion_id } = req.body;

  var query = ` INSERT INTO solicitudes_retiro, tipo, usuario_id, monto_solicitud,
                comision_aplicar, monto_recibir, fecha_aprobacion, estado, inversion_id
                VALUES ('${tipo}', '${usuario_id}', '${monto_solicitud}', '${comision_aplicar}', 
                '${monto_recibir}', '${fecha_aprobacion}', '${estado}', '${inversion_id}');`;

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
  const { tipo, usuario_id, monto_solicitud, comision_aplicar, monto_recibir, fecha_solicitud,
    fecha_aprobacion, foto_identificacion, selfie_identificacion, estado, inversion_id } = req.body;

  var query = `UPDATE solicitudes_retiro SET 
  tipo = '${tipo}', usuario_id = '${usuario_id}',
  monto_solicitud = '${monto_solicitud}', comision_aplicar = '${comision_aplicar}',
  monto_recibir= '${monto_recibir}', fecha_aprobacion = '${fecha_aprobacion}',
  estado = '${estado}', inversion_id = '${inversion_id}'
  WHERE retiro_id = '${req.params.id}';`;

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
        message: "Producto actualizado correctamente",
      });
    }
  });
});

router.patch("/:id", function (req, res, next) { //eliminado lógico
  var query = `UPDATE solicitudes_retiro SET 
  estado = 'Eliminado'
  WHERE retiro_id = '${req.params.id}';`;

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
        message: "inversión eliminado correctamente",
      });
    }
  });
});

router.patch("/aprobar/:id", function (req, res, next) { //aprobar la solicitud de retiro
  var query = `UPDATE solicitudes_retiro SET 
  estado = 'Aprobado'
  WHERE retiro_id = '${req.params.id}';`;

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
        message: "Inversión aprobada correctamente",
      });
    }
  });
});

router.patch("/pendiente/:id", function (req, res, next) { //pendiente la solicitud de retiro
  var query = `UPDATE solicitudes_retiro SET
  estado = 'Pendiente'
  WHERE retiro_id = '${req.params.id}';`;

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
        message: "Inversión Pendiente",
      });
    }
  });
});

module.exports = router;
