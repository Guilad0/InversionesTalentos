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
  const queryFilas = (filtro == 'General') ? `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion` : `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion where aprobado = '${filtro}'`;

  conexion.query(queryFilas, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al contar las filas", err });
    }

    const numFilas = results[0].numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);

    // Consulta para obtener los datos con paginación
    const query = (filtro == 'General') ? `SELECT * FROM solicitudes_inversion LIMIT ${limite}` : `SELECT * FROM solicitudes_inversion where aprobado = '${filtro}' LIMIT ${limite}`;

    conexion.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Error al obtener solicitudes de inversión", err });
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

      res.status(200).json({ data: results, paginacion, message: "Solicitudes de inversión consultadas correctamente" });
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
      return res.status(500).json({ msg: "Error al obtener los totales de inversión", err });
    }
    res.status(200).json({ results });
  })
}

// get para pendientes de inversion
const getSolicitudesInversionPendientes = (req, res) => {
  const estado = req.query.estado || ''; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || '';
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado ? `AND solicitudes_inversion.estado = '${estado}'` : '';

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
        res.status(500).send({ error, message: "Error al realizar la petición" });
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
  const estado = req.query.estado || ''; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || '';
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado ? `AND solicitudes_inversion.estado = '${estado}'` : '';

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
        res.status(500).send({ error, message: "Error al realizar la petición" });
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
  const estado = req.query.estado || ''; // Obtiene el estado de la consulta si existe
  const busqueda = req.query.search || '';
  const pagina = parseInt(req.query.page, 10) || 1;
  const porPagina = 10;
  const salto = (pagina - 1) * porPagina;

  // Agregar filtro de estado a la consulta SQL si está presente
  let filtroEstado = estado ? `AND solicitudes_inversion.estado = '${estado}'` : '';

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
        res.status(500).send({ error, message: "Error al realizar la petición" });
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
      return res.status(500).json({ msg: "Error al obtener la solicitud de inversión", err });
    }
    res.status(200).json({ results });
  });
};

const createSolicitudInversion = (req, res) => {
  const { cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago } = req.body;


  const queryCategoria = `
    SELECT cp.monto_minimo_inversion, cp.monto_maximo_inversion 
    FROM usuarios u 
    JOIN categoria_personas cp ON u.categoria_persona_id = cp.categoria_persona_id 
    WHERE u.usuario_id = ?`;

  conexion.query(queryCategoria, [cliente_id], (err, categoriaResults) => {
    if (err) {
      return res.status(500).json({ msg: "Error al consultar la categoría del usuario", err });
    }

    if (!categoriaResults || categoriaResults.length === 0) {
      return res.status(400).json({ msg: "No se encontró la categoría del usuario" });
    }

    const { monto_minimo_inversion, monto_maximo_inversion } = categoriaResults[0];


    let aprobado = "Aprobado";
    if (monto > monto_maximo_inversion || monto < monto_minimo_inversion) {
      aprobado = "Pendiente";
    }


    const query = "INSERT INTO solicitudes_inversion (cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(query, [cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado], (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Error al crear la solicitud de inversión", err });
      }
      res.status(201).json({
        msg: "Solicitud de inversión creada exitosamente",
        results,
        aprobado,
        montoMinimo: monto_minimo_inversion,
        montoMaximo: monto_maximo_inversion
      });
    });
  });
};

const updateSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const { cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado } = req.body;
  const query = "UPDATE solicitudes_inversion SET cliente_id = ?, nombre = ?, descripcion = ?, fecha_inicio_recaudacion = ?, fecha_fin_recaudacion = ?, monto = ?, cantidad_pagos = ?, fecha_inicio_pago = ?, fecha_fin_pago = ?, aprobado = ?, estado = ? WHERE id = ?";
  conexion.query(query, [cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado, id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al actualizar la solicitud de inversión", err });
    }
    res.status(200).json({ msg: "Solicitud de inversión actualizada exitosamente", results });
  });
};

const aprobarSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE solicitudes_inversion SET observaciones='${req.query.observaciones}', aprobado = '${req.query.action}' WHERE id = ?`;
  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al aprobar la solicitud de inversión", err });
    }
    res.status(200).json({ msg: "Solicitud de inversión aprobada exitosamente", results });
  });
};

const deleteSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE solicitudes_inversion SET estado = 0 WHERE id = ?";
  conexion.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al cambiar el estado de la solicitud de inversión", err });
    }
    res.status(200).json({ msg: "Estado de la solicitud de inversión cambiado exitosamente", results });
  });
};
const getSolicitudesInversionByUserId = (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM solicitudes_inversion WHERE cliente_id = ?";
  conexion.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al obtener las solicitudes de inversión del usuario", err });
    }
    res.status(200).json({ results });
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
  aprobarSolicitudInversion,
  deleteSolicitudInversion,
  getSolicitudesInversionByUserId,
  getTotals
};