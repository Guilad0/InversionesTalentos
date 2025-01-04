import {sequelize} from "../database.js";
import { getDataError400, getError500, getResponse200, getResponse200WithData } from "../helpers/Response.js";
import { SolicitudInversion, Inversion, User, Movimiento } from '../models/mainExport.js'


const getSolicitudesInversion = async (req, res) => {
  try {
    const porPagina = 10; // Número de resultados por página
    const filtro = req.query.filtro;
    const pagina = parseInt(req.query.page, 10) || 1; // Página actual
    const salto = (pagina - 1) * porPagina; // Calcular el número de resultados a saltar
    const limite = `${salto}, ${porPagina}`; // Límite para la consulta SQL
    // Consulta para contar el número total de filas
    const queryFilas =
      filtro == "General"
        ? `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion`
        : `SELECT COUNT(*) AS numFilas FROM solicitudes_inversion WHERE aprobado = :filtro`;
    const [countResult] = await sequelize.query(queryFilas, {
      replacements: { filtro: filtro },
      type: sequelize.QueryTypes.SELECT,
    });
    const numFilas = countResult.numFilas;
    const numPaginas = Math.ceil(numFilas / porPagina);
    const querySolicitudes =
      filtro == "General"
        ? `SELECT * FROM solicitudes_inversion LIMIT :limite OFFSET :salto`
        : `SELECT * FROM solicitudes_inversion WHERE aprobado = :filtro LIMIT :limite OFFSET :salto`;
    const solicitudes = await sequelize.query(querySolicitudes, { 
      replacements: { 
        filtro: filtro, 
        limite: porPagina, 
        salto: salto 
      },
      type: sequelize.QueryTypes.SELECT,
    });
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
        data: results,
        paginacion,
        message: "Solicitudes de inversión consultadas correctamente",
      });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getTotals = async (req, res) => {
    try {
      const query = `
      SELECT 
          SUM(CASE WHEN aprobado = 'Pendiente' THEN 1 ELSE 0 END) AS Rechazado,
          SUM(CASE WHEN aprobado = 'Aprobado' THEN 1 ELSE 0 END) AS Aprobado,
          SUM(CASE WHEN aprobado = 'Rechazado' THEN 1 ELSE 0 END) AS Pendiente,
          COUNT(*) AS total
      FROM solicitudes_inversion;
      `;
      const [results] = await sequelize.query(query, { 
        type: sequelize.QueryTypes.SELECT,
      })
      getResponse200WithData('Ok', {results}, res);
    } catch(e) { 
      getError500('Error al obtener los totales de inversión', e, res);
    }
};

const getSolicitudesInversionPendientes = async (req, res) => {
  try {
    const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
    const busqueda = req.query.search || "";
    const pagina = parseInt(req.query.page, 10) || 1;
    const porPagina = 10;
    const salto = (pagina - 1) * porPagina;
    let filtroEstado = estado ? "AND solicitudes_inversion.estado = :estado" : "";
    const queryFilas = `
      SELECT COUNT(*) AS numFilas
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
      ${filtroEstado};
    `;
    const [resultsFilas] = await sequelize.query(queryFilas, { 
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
      },
      type: sequelize.QueryTypes.SELECT,
    }); 
    const numFilas = resultsFilas.numFilas || 0;
    const numPaginas = Math.ceil(numFilas / porPagina);
    const query = `
      SELECT solicitudes_inversion.*, 
             concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.usuario_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
      AND solicitudes_inversion.estado = 'Pendiente'
      ${filtroEstado}
      LIMIT :salto, :porPagina;
    `;
    const [results] = await sequelize.query(query, { 
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
        salto,
        porPagina,
      },
      type: sequelize.QueryTypes.SELECT,
    })
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
      message: "Listando solicitudes de inversión pendientes",
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getSolicitudesInversionAprobados = async (req, res) => {
  try {
    const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
    const busqueda = req.query.search || "";
    const pagina = parseInt(req.query.page, 10) || 1;
    const porPagina = 10;
    const salto = (pagina - 1) * porPagina;
    let filtroEstado = estado ? "AND solicitudes_inversion.estado = :estado" : "";
    const queryFilas = `
      SELECT COUNT(*) AS numFilas
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
      ${filtroEstado};
    `;
    const [resultsFilas] = await sequelize.query(queryFilas, { 
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
      },
      type: sequelize.QueryTypes.SELECT,
    })
    const numFilas = resultsFilas.numFilas || 0;
    const numPaginas = Math.ceil(numFilas / porPagina);

    const query = `
        SELECT solicitudes_inversion.*, 
              concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
        FROM solicitudes_inversion
        INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
        WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
        AND solicitudes_inversion.estado = 'Aprobado'
        ${filtroEstado}
        LIMIT :salto, :porPagina;
      `;
    const [results] = await sequelize.query(query, {
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
        salto,
        porPagina,
      },
      type: sequelize.QueryTypes.SELECT,
    });
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
      message: "Listando solicitudes de inversión aprobadas",
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getSolicitudesInversionRechazados = async (req, res) => {
  try {
    const estado = req.query.estado || ""; // Obtiene el estado de la consulta si existe
    const busqueda = req.query.search || "";
    const pagina = parseInt(req.query.page, 10) || 1;
    const porPagina = 10;
    const salto = (pagina - 1) * porPagina;
    let filtroEstado = estado ? "AND solicitudes_inversion.estado = :estado" : "";
    const queryFilas = `
      SELECT COUNT(*) AS numFilas
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
      ${filtroEstado};
    `;
    const [resultFilas] = await sequelize.query(queryFilas, {
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    const numFilas = resultFilas.numFilas || 0;
    const numPaginas = Math.ceil(numFilas / porPagina);
    const query = `
      SELECT solicitudes_inversion.*, 
            concat(usuarios.nombre, ' ', usuarios.apellido, ' - ', usuarios.rol) AS username
      FROM solicitudes_inversion
      INNER JOIN usuarios ON solicitudes_inversion.cliente_id = usuarios.usuario_id
      WHERE concat(usuarios.nombre, ' ', usuarios.apellido) LIKE :busqueda
      AND solicitudes_inversion.estado = 'Rechazado'
      ${filtroEstado}
      LIMIT :salto, :porPagina;
    `;
    const [results] = await sequelize.query(query, {
      replacements: {
        busqueda: `%${busqueda}%`,
        estado: estado || undefined,
        salto,
        porPagina,
      },
      type: sequelize.QueryTypes.SELECT,
    });
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
      message: "Listando solicitudes de inversión rechazadas",
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getSolicitudInversionById = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitudInversion = await SolicitudInversion.findOne({where: { id: id }});
    getResponse200WithData('Ok', {solicitudInversion}, res);
  } catch(e) {
    getError500('Error al obtener la solicitud de inversión!', e, res);
  }
};

const getInversoresDeSolicitud = async (req, res) => {
  try {
    const inversiones = await Inversion.findAll({ 
      attributes: ['inversor_id', 'monto'], 
      where: {
        solicitudInvId: req.params.id, 
      },
    });
    if (inversiones.length === 0) { return res.status(200).json({ results: [], totalInvertido: 0 }); }
    const idInversionistas = inversiones.map((s) => s.inversorId);
    const usuarios= await User.findAll({
      attributes: ['nombre', 'apellido'], // Campos que deseas obtener
      where: {
        usuarioId: idInversionistas, // Utiliza el array en la condición IN
      },
    })
    let totalInvertido = 0;
    const results = usuarios.map((inv, i) => {
      const inversor = inversiones[i];
      totalInvertido += parseInt(inversiones[i].monto);
      return {
        ...inv,
        ...inversor,
      };
    });
    getResponse200WithData('Ok', { results, totalInvertido }, res); 
  } catch(e) { 
    getError500('Error al obtener la solicitud de inversión', e, res);
  }
};

const finalizarInversion = async (req, res) => {
  try {
    const fechaActual = new Date().toISOString().split("T")[0];
    const [updeteSolicitudInv] = await SolicitudInversion.update({
      fechaFinRecaudacion: fechaActual, estadoInversion: 'Finalizado'
    }, {where: { id: req.params.id }});
    if (updeteSolicitudInv === 0) { return getDataError400('Error al actualizar inversiones', res); }
    getResponse200('Solicitud de inversion Actualizado!', res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const revertirInversion = async (req, res) => {
  try {
    const fechaActual = new Date().toISOString().split("T")[0];
    const [updateSolicitudInv] = await SolicitudInversion.update({ 
      fechaFinRecaudacion: fechaActual, observaciones: req.query.observaciones, 
      estadoInversion: 'Reversion'}, { where:{ id: req.params.id }});
    if (updateSolicitudInv === 0) { return getDataError400('Error al actualizar inversiones paso 1', res); }
    const [updateInversion] = await Inversion.update({ monto: 0}, 
      { where: { solicitudInvId: req.params.id }});
    if (updateInversion === 0) { return getDataError400('Error al actualizar inversiones', res); }
    const solicitudesInversion = await SolicitudInversion.findAll({ 
      attributes: ['cliente_id', 'inversor_id', 'inversion_id'], 
      where: { solicitudInvId: req.params.id} } );
    if (solicitudesInversion.length === 0) { return getDataError400('Error al actualizar inversiones paso2', res); }
    const usersId = solicitudesInversion.flatMap(item => [
      { tipo: 'talento', id: item.clienteId, tipoMovimiento: 'Egreso', },
      { tipo: 'inversor', id: item.inversorId, tipoMovimiento: 'Ingreso', }
    ]);
    const promises = usersId.map(async (cliente) => {
        const [query] = await Movimiento.update({ 
          tipo:cliente.tipoMovimiento, descripcion:'Reversion'}, 
          { where: { usuarioId:cliente.id}} );
          if (query === 0) {
            throw new Error(`Error al actualizar el id ${cliente.id}`);
          } 
        return query;
    });
    Promise.all(promises);
    getResponse200('Todas las actualizaciones se completaron correctamente.', res);
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const createSolicitudInversion = async (req, res) => {
  try {
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
      porcentaje_interes,
    } = req.body;
    // Primero actualizar solicitudes rechazadas
    const updateQuery = `
      UPDATE solicitudes_inversion 
      SET estado_inversion = NULL 
      WHERE cliente_id = ? 
      AND aprobado = 'Rechazado'`;
    sequelize.query(updateQuery, [cliente_id], (updateErr) => {
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
      sequelize.query(queryCategoria, [cliente_id], (err, categoriaResults) => {
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
        const { monto_minimo_inversion, monto_maximo_inversion } = categoriaResults[0];
        let aprobado = "Aprobado";
        if (monto > monto_maximo_inversion || monto < monto_minimo_inversion) {
          aprobado = "Pendiente";
        }
        const query =
          "INSERT INTO solicitudes_inversion (cliente_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, porcentaje_interes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        sequelize.query(
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
            porcentaje_interes,
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
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const updateSolicitudInversion = async (req, res) => {
  try {
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
    sequelize.query(
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
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const procesarSolicitudInversion = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.query.porcentaje_interes);
    let query =
      req.query.action == "Aprobado"
        ? `UPDATE solicitudes_inversion SET observaciones='${req.query.observaciones}', aprobado = '${req.query.action}', porcentaje_interes = ${req.query.porcentaje_interes} WHERE id = ?`
        : `UPDATE solicitudes_inversion SET observaciones='${req.query.observaciones}', aprobado = '${req.query.action}' WHERE id = ?`;
    sequelize.query(query, [id], (err, results) => {
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
        "update informacion set monto_inversion = ?, cantidad_maxima_inversiones = cantidad_maxima_inversiones where cliente_id = ?";
      sequelize.query(query, [minInv, idCliente], (err, results) => {
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
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const deleteSolicitudInversion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE solicitudes_inversion SET estado = 0 WHERE id = ?";
    sequelize.query(query, [id], (err, results) => {
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
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getSolicitudesInversionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM solicitudes_inversion 
      WHERE cliente_id = ? AND estado = 1`;
    const query = `
      SELECT 
        s.*,
        COALESCE(SUM(CASE WHEN i.estado = 1 THEN i.monto ELSE 0 END), 0) as monto_recaudado,
        s.monto - COALESCE(SUM(CASE WHEN i.estado = 1 THEN i.monto ELSE 0 END), 0) as monto_faltante,
        IFNULL(
          JSON_ARRAYAGG(
            CASE 
              WHEN i.inversor_id IS NOT NULL AND i.estado = 1 THEN
                JSON_OBJECT(
                  'inversor_id', i.inversor_id,
                  'nombre', CONCAT(u.nombre, ' ', u.apellido),
                  'monto', i.monto,
                  'fecha_deposito', DATE_FORMAT(i.fecha_deposito, '%Y-%m-%d'),
                  'ganancia_estimada', i.ganancia_estimada,
                  'fecha_devolucion', DATE_FORMAT(i.fecha_devolucion, '%Y-%m-%d'),
                  'estado_inversion', s.estado_inversion  /* Cambiado de i.estado_inversion a s.estado_inversion */
                )
              ELSE NULL 
            END
          ),
          '[]'
        ) as inversores
      FROM solicitudes_inversion s
      LEFT JOIN inversiones i ON s.id = i.solicitud_inv_id
      LEFT JOIN usuarios u ON i.inversor_id = u.usuario_id
      WHERE s.cliente_id = ? AND ${req.query.estado}
      GROUP BY s.id
      ORDER BY s.id DESC
      LIMIT ? OFFSET ?`;
  
  
    sequelize.query(countQuery, [userId], (countError, countResults) => {
      if (countError) {
        return res.status(500).json({
          msg: "Error al obtener el total de registros",
          error: countError
        });
      }
  
      const total = countResults[0].total;
      const totalPages = Math.ceil(total / limit);
  
  
      sequelize.query(query, [userId, limit, offset], (err, results) => {
        if (err) {
          return res.status(500).json({
            msg: "Error al obtener las solicitudes de inversión del usuario",
            error: err
          });
        }
  
        const processedResults = results.map(row => {
          try {
            const inversoresArray = JSON.parse(row.inversores || '[]')
              .filter(inv => inv !== null)
              .map(inv => ({
                ...inv,
                monto: parseFloat(inv.monto || 0),
                ganancia_estimada: parseFloat(inv.ganancia_estimada || 0)
              }));
  
            return {
              ...row,
              monto_recaudado: parseFloat(row.monto_recaudado || 0),
              monto_faltante: parseFloat(row.monto_faltante || 0),
              inversores: inversoresArray
            };
          } catch (error) {
            console.error('Error procesando fila:', error, row);
            return {
              ...row,
              monto_recaudado: parseFloat(row.monto_recaudado || 0),
              monto_faltante: parseFloat(row.monto_faltante || 0),
              inversores: []
            };
          }
        });
  
        res.status(200).json({
          results: processedResults,
          pagination: {
            total,
            totalPages,
            currentPage: page,
            perPage: limit
          },
          message: "Solicitudes consultadas correctamente"
        });
      });
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const showButton = async (req, res) => {
  try {
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
          WHEN NOT EXISTS (
            SELECT 1 FROM ultima_solicitud
          ) THEN 1
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
        END as show_button;
    `;
    sequelize.query(query, [id], (err, results) => {
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
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const cambiarEstadoProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSolicitudInv = await SolicitudInversion.update(
      {estadoInversion: 'Proceso'}, {where:{ id: id}} );
    res.status(200).json({
      msg: "Estado de la solicitud cambiado a Proceso exitosamente",
      results
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const procesarInversionByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoAccion, reason } = req.query;
    if( tipoAccion === 'cancelo') { 
      await SolicitudInversion.update(
        {
          aprobado: 'Rechazado',
          observaciones: reason || null,
          canceladoPor: 'Talento',
        }, { where: { id }, } );
    } else { 
      await SolicitudInversion.update(
        {
          aprobado: 'Aprobado',
          estado_inversion: 'Pendiente',
        }, {where: { id }} );
    }
    res.status(200).json({
      msg: "Estado de la solicitud cambiado a Pendiente exitosamente",
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const getSolicitudByClienteId = async (req, res) => {
  try {
    const solicitudInv = await SolicitudInversion.findAll({where:{clienteId:req.params.id}});
    solicitudInv[0].fechaFinPago = new Date(solicitudInv[0].fechaFinPago)
    .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    solicitudInv[0].fechaInicioPago = new Date(solicitudInv[0].fechaInicioPago)
    .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    res.status(200).json({ results:solicitudInv[0] })
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};


export {
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
  cambiarEstadoProceso,
  getSolicitudByClienteId,
  procesarInversionByUser
};
