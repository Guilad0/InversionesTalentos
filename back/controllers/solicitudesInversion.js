const conexion = require("../database");

const getSolicitudesInversion = (req, res) => {
  // Parámetros de paginación
  const porPagina = 10; // Número de resultados por página
  const filtro = req.query.filtro;
  console.log(filtro);
  const pagina = parseInt(req.query.page, 10) || 1; // Página actual
  const salto = (pagina - 1) * porPagina; // Calcular el número de resultados a saltar
  const limite = `${salto}, ${porPagina}`; // Límite para la consulta SQL

  // Consulta para contar el número total de filas
  const queryFilas =
    filtro == "General"
      ? `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion`
      : `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion where aprobado = '${filtro}'`;

  conexion.query(queryFilas, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al contar las filas", err });
    }

    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    // Consulta para obtener los datos con paginación
    const query =
      filtro == "General"
        ? `SELECT * FROM solicitudes_inversion LIMIT ${limite}`
        : `SELECT * FROM solicitudes_inversion where aprobado = '${filtro}' LIMIT ${limite}`;

    conexion.query(query, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al obtener solicitudes de inversión", err });
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

      res
        .status(200)
        .json({
          data: results,
          paginacion,
          message: "Solicitudes de inversión consultadas correctamente",
        });
    });
  });
};

const getTotals = (req, res) => {
  const query = `SELECT 
    IFNULL(aprobado, 'todo') AS estado, 
    COUNT(*) AS total
    FROM 
        solicitudes_inversion
    GROUP BY 
    aprobado WITH ROLLUP;`;
  conexion.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Error al obtener los totales de inversión", err });
    }
    res.status(200).json({ results });
  });
};

// get para pendientes de inversion
const getSolicitudesInversionPendientes = (req, res) => {
  const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || "";
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado
    ? `AND solicitudes_inversion.estado = '${estado}'`
    : "";

  const queryFilas = `
    SELECT COUNT(*) AS numFilas
    FROM solicitudes_inversion
    INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
    WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
    ${filtroEstado};`;

  conexion.query(queryFilas, function (error, results) {
    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    const query = `
      SELECT solicitudes_inversion.*, concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.usuario_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
      AND solicitudes_inversion.estado= 'Pendiente'
      ${filtroEstado} 
      LIMIT ${salto}, ${porPagina};`;

    conexion.query(query, function (error, results) {
      if (error) {
        res
          .status(500)
          .send({ error, message: "Error al realizar la petición" });
      } else {
        res.status(200).send({
          pagination: {
            total: numFilas,
            current: pagina,
            pages: Array.from({ length: numPaginas }, (_, i) => i + 1),
            perPage: porPagina,
            previous: pagina > 1 ? pagina - 1 : null,
            next: pagina < numPaginas ? pagina + 1 : null,
          },
          data: results,
          message: "Listando clientes",
        });
      }
    });
  });
};

// get para aprobados de inversiones
const getSolicitudesInversionAprobados = (req, res) => {
  const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || "";
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado
    ? `AND solicitudes_inversion.estado = '${estado}'`
    : "";

  const queryFilas = `
    SELECT COUNT(*) AS numFilas
    FROM solicitudes_inversion
    INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
    WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
    ${filtroEstado};`;

  conexion.query(queryFilas, function (error, results) {
    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    const query = `
      SELECT solicitudes_inversion.*, concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
      AND solicitudes_inversion.estado= 'Aprobado'
      ${filtroEstado} 
      LIMIT ${salto}, ${porPagina};`;

    conexion.query(query, function (error, results) {
      if (error) {
        res
          .status(500)
          .send({ error, message: "Error al realizar la petición" });
      } else {
        res.status(200).send({
          pagination: {
            total: numFilas,
            current: pagina,
            pages: Array.from({ length: numPaginas }, (_, i) => i + 1),
            perPage: porPagina,
            previous: pagina > 1 ? pagina - 1 : null,
            next: pagina < numPaginas ? pagina + 1 : null,
          },
          data: results,
          message: "Listando clientes",
        });
      }
    });
  });
};

// get para rechazados de inversiones
const getSolicitudesInversionRechazados = (req, res) => {
  const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || "";
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado
    ? `AND solicitudes_inversion.estado = '${estado}'`
    : "";

  const queryFilas = `
    SELECT COUNT(*) AS numFilas
    FROM solicitudes_inversion
    INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
    WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
    ${filtroEstado};`;

  conexion.query(queryFilas, function (error, results) {
    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    const query = `
      SELECT solicitudes_inversion.*, concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.usuario_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${busqueda}%'
      AND solicitudes_inversion.estado= 'Rechazado'
      ${filtroEstado} 
      LIMIT ${salto}, ${porPagina};`;

    conexion.query(query, function (error, results) {
      if (error) {
        res
          .status(500)
          .send({ error, message: "Error al realizar la petición" });
      } else {
        res.status(200).send({
          pagination: {
            total: numFilas,
            current: pagina,
            pages: Array.from({ length: numPaginas }, (_, i) => i + 1),
            perPage: porPagina,
            previous: pagina > 1 ? pagina - 1 : null,
            next: pagina < numPaginas ? pagina + 1 : null,
          },
          data: results,
          message: "Listando clientes",
        });
      }
    });
  });
};

const getSolicitudInversionById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM solicitudes_inversion WHERE id = ?";
  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Error al obtener la solicitud de inversión", err });
    }
    res.status(200).json({ results });
  });
};

const getInversoresDeSolicitud = (req, res) => {
  let query = `SELECT inversor_id, monto,estado_inversion FROM inversiones WHERE solicitud_inv_id = ${req.params.id}`;
  conexion.query(query, (err, resultsInversores) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Error al obtener la solicitud de inversión", err });
    }
    if (resultsInversores.length === 0) {
      return res.status(200).json({ results: [], totalInvertido: 0 });
    }
    const idInversionistas = resultsInversores.map((s) => s.inversor_id);
    console.log(idInversionistas.join(","));
    query = `select 
          nombre,
          apellido 
          from usuarios where usuario_id IN (${idInversionistas.join(",")})`;
    conexion.query(query, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al obtener la solicitud de inversión", err });
      }
      let totalInvertido = 0;
      let estadoInv = ''
      const results = data.map((inv, i) => {
        const inversor = resultsInversores[i];
        totalInvertido += parseInt(resultsInversores[i].monto);
        estadoInv += parseInt(resultsInversores[i].estado_inversion);
        return {
          ...inv,
          ...inversor,
          ...estadoInv
        };
      });
      res.status(200).json({ results, totalInvertido });
    });
  });
};

const finalizarInversion = (req, res) => {
  let query = `UPDATE solicitudes_inversion SET fecha_fin_recaudacion = ?, estado_inversion = 'Finalizado' WHERE id = ?`;
  const fechaActual = new Date().toISOString().split("T")[0];
  conexion.query(query, [fechaActual, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al actualizar inversiones" });
    }
    res.status(200).json({ results });
  });
};

const revertirInversion = (req, res) => {
  let query = `UPDATE solicitudes_inversion SET fecha_fin_recaudacion = ?, observaciones= ?, estado_inversion = 'Reversion' WHERE id = ?`;
  const fechaActual = new Date().toISOString().split("T")[0];
  conexion.query(
    query,
    [fechaActual, req.query.observaciones, req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Error al actualizar inversiones" });
      }
      console.log(req.params.id);
      query = `
      UPDATE inversiones
      SET estado_inversion = 'Revertido'
      WHERE solicitud_inv_id = ${req.params.id};    
      `;
      conexion.query(query, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error al actualizar inversiones" });
        }
        query = `SELECT cliente_id, inversor_id, inversion_id
      FROM inversiones
      WHERE solicitud_inv_id = ${req.params.id};`;
        conexion.query(query, (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ msg: "Error al actualizar inversiones" });
          }
          const usersId = results.flatMap(item => [
            { tipo: 'talento', id: item.cliente_id,tipoMovimiento: 'Egreso', },
            { tipo: 'inversor', id: item.inversor_id,tipoMovimiento: 'Ingreso', }
          ]);
          const promises = usersId.map((cliente) => {
            const query = `UPDATE movimientos SET tipo=?,descripcion='Reversion' WHERE usuario_id = ?`;
            return new Promise((resolve, reject) => {
              conexion.query(query, [cliente.tipoMovimiento, cliente.id], (err, results) => {
                if (err) {
                  console.error(`Error al actualizar el id ${cliente.id}:`, err);
                  reject(err);
                } else {
                  console.log(`Actualización exitosa para el id ${cliente.id}`);
                  resolve(results);
                }
              });
            });
          });
          Promise.all(promises)
          .then(() => {
            res.status(200).json({ msg: "Todas las actualizaciones se completaron correctamente." });
          })
          .catch((err) => {
            res.status(500).json({  msg: "Ocurrió un error al procesar las actualizaciones." });
          });
          
        });
      });
    }
  );
};

const createSolicitudInversion = (req, res) => {
  const {
    cliente_id,
    nombre,
    descripcion,
    fecha_inicio_recaudacion,
    fecha_fin_recaudacion,
    monto,
    cantidad_pagos,
    fecha_inicio_pago,
    fecha_fin_pago,
  } = req.body;

  // Primero actualizar solicitudes rechazadas
  const updateQuery = `
    UPDATE solicitudes_inversion 
    SET estado_inversion = NULL 
    WHERE cliente_id = ? 
    AND aprobado = 'Rechazado'`;

  conexion.query(updateQuery, [cliente_id], (updateErr) => {
    if (updateErr) {
      return res
        .status(500)
        .json({ msg: "Error al actualizar solicitudes rechazadas", updateErr });
    }

    // Consultar categoría y continuar con el flujo normal
    const queryCategoria = `
      SELECT cp.monto_minimo_inversion, cp.monto_maximo_inversion 
      FROM usuarios u 
      JOIN categoria_personas cp ON u.categoria_persona_id = cp.categoria_persona_id 
      WHERE u.usuario_id = ?`;

    conexion.query(queryCategoria, [cliente_id], (err, categoriaResults) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al consultar la categoría del usuario", err });
      }

      if (!categoriaResults || categoriaResults.length === 0) {
        return res
          .status(400)
          .json({ msg: "No se encontró la categoría del usuario" });
      }

      const { monto_minimo_inversion, monto_maximo_inversion } =
        categoriaResults[0];

      let aprobado = "Aprobado";
      if (monto > monto_maximo_inversion || monto < monto_minimo_inversion) {
        aprobado = "Pendiente";
      }

      const query =
        "INSERT INTO solicitudes_inversion (cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      conexion.query(
        query,
        [
          cliente_id,
          nombre,
          descripcion,
          fecha_inicio_recaudacion,
          fecha_fin_recaudacion,
          monto,
          cantidad_pagos,
          fecha_inicio_pago,
          fecha_fin_pago,
          aprobado,
        ],
        (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ msg: "Error al crear la solicitud de inversión", err });
          }
          res.status(201).json({
            msg: "Solicitud de inversión creada exitosamente",
            results,
            aprobado,
            montoMinimo: monto_minimo_inversion,
            montoMaximo: monto_maximo_inversion,
          });
        }
      );
    });
  });
};

const updateSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const {
    cliente_id,
    nombre,
    descripcion,
    fecha_inicio_recaudacion,
    fecha_fin_recaudacion,
    monto,
    cantidad_pagos,
    fecha_inicio_pago,
    fecha_fin_pago,
    aprobado,
    estado,
  } = req.body;
  const query =
    "UPDATE solicitudes_inversion SET cliente_id = ?, nombre = ?, descripcion = ?, fecha_inicio_recaudacion = ?, fecha_fin_recaudacion = ?, monto = ?, cantidad_pagos = ?, fecha_inicio_pago = ?, fecha_fin_pago = ?, aprobado = ?, estado = ? WHERE id = ?";
  conexion.query(
    query,
    [
      cliente_id,
      nombre,
      descripcion,
      fecha_inicio_recaudacion,
      fecha_fin_recaudacion,
      monto,
      cantidad_pagos,
      fecha_inicio_pago,
      fecha_fin_pago,
      aprobado,
      estado,
      id,
    ],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al actualizar la solicitud de inversión", err });
      }
      res
        .status(200)
        .json({
          msg: "Solicitud de inversión actualizada exitosamente",
          results,
        });
    }
  );
};

const procesarSolicitudInversion = (req, res) => {
  const { id } = req.params;
  let query =
    req.query.action == "Aprobado"
      ? `UPDATE solicitudes_inversion SET observaciones='${req.query.observaciones}', aprobado = '${req.query.action}',estado_inversion = 'Proceso' WHERE id = ?`
      : `UPDATE solicitudes_inversion SET observaciones='${req.query.observaciones}', aprobado = '${req.query.action}',estado_inversion = 'Pendiente' WHERE id = ?`;
  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: "Error al procesar la solicitud de inversión", err });
    }
    if (req.query.action == "Rechazado") {
      return res
        .status(200)
        .json({
          msg: "Solicitud de inversión rechazada exitosamente",
          results,
        });
    }
    const { minInv, maxInv, idCliente } = req.query;
    query =
      "update informacion set monto_inversion = ?, cantidad_maxima_inversiones = ? where cliente_id = ?";
    conexion.query(query, [minInv, maxInv, idCliente], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({
            msg: "Error al procesar los montos de inversiond el cliente",
            err,
          });
      }
      res.status(200).json({ msg: "Solicitud aprobadao" });
    });
  });
};

const deleteSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE solicitudes_inversion SET estado = 0 WHERE id = ?";
  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: "Error al cambiar el estado de la solicitud de inversión",
          err,
        });
    }
    res
      .status(200)
      .json({
        msg: "Estado de la solicitud de inversión cambiado exitosamente",
        results,
      });
  });
};
const getSolicitudesInversionByUserId = (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM solicitudes_inversion WHERE cliente_id = ?";
  conexion.query(query, [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: "Error al obtener las solicitudes de inversión del usuario",
          err,
        });
    }
    res.status(200).json({ results });
  });
};

const showButton = (req, res) => {
  const id = req.params.id;
  const query = `
    WITH ultima_solicitud AS (
      SELECT 
        id,
        aprobado,
        estado_inversion
      FROM solicitudes_inversion 
      WHERE cliente_id = ? 
      AND estado = 1
      ORDER BY id DESC 
      LIMIT 1
    )
    SELECT 
      CASE 
        WHEN (
          SELECT 
            CASE 
              WHEN aprobado = 'Rechazado' THEN 1
              WHEN aprobado = 'Aprobado' AND estado_inversion = 'Finalizado' THEN 1
              WHEN aprobado = 'Aprobado' AND estado_inversion = 'Reversion' THEN 1
              ELSE 0
            END
          FROM ultima_solicitud
        ) = 1 THEN 1
        ELSE 0
      END as show_button
    FROM ultima_solicitud;
  `;

  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err,
        message: "Error al consultar el estado de las solicitudes",
      });
    }
    res.status(200).json({
      showButton: results[0]?.show_button || 0,
      clienteId: id,
    });
  });
};

module.exports = {
  getSolicitudesInversion,
  getSolicitudesInversionAprobados,
  getSolicitudesInversionPendientes,
  getSolicitudesInversionRechazados,
  getSolicitudInversionById,
  createSolicitudInversion,
  updateSolicitudInversion,
  procesarSolicitudInversion,
  deleteSolicitudInversion,
  getSolicitudesInversionByUserId,
  getTotals,
  showButton,
  getInversoresDeSolicitud,
  finalizarInversion,
  revertirInversion,
};
