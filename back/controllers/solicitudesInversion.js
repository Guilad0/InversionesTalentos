const conexion = require("../database");

const getSolicitudesInversion = (req, res) => {
  const query = "SELECT * FROM solicitudes_inversion";
  conexion.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al obtener solicitudes de inversión", err });
    }
    res.status(200).json({ data: results });
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
  const { client_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado } = req.body;
  const query = "INSERT INTO solicitudes_inversion (client_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conexion.query(query, [client_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al crear la solicitud de inversión", err });
    }
    res.status(201).json({ msg: "Solicitud de inversión creada exitosamente", results });
  });
};

const updateSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const { client_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado } = req.body;
  const query = "UPDATE solicitudes_inversion SET client_id = ?, nombre = ?, descripcion = ?, fecha_inicio_recaudacion = ?, fecha_fin_recaudacion = ?, monto = ?, cantidad_pagos = ?, fecha_inicio_pago = ?, fecha_fin_pago = ?, aprobado = ?, estado = ? WHERE id = ?";
  conexion.query(query, [client_id, nombre, descripcion, fecha_inicio_recaudacion, fecha_fin_recaudacion, monto, cantidad_pagos, fecha_inicio_pago, fecha_fin_pago, aprobado, estado, id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error al actualizar la solicitud de inversión", err });
    }
    res.status(200).json({ msg: "Solicitud de inversión actualizada exitosamente", results });
  });
};

const aprobarSolicitudInversion = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE solicitudes_inversion SET aprobado = 1 WHERE id = ?";
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

module.exports = {
  getSolicitudesInversion,
  getSolicitudInversionById,
  createSolicitudInversion,
  updateSolicitudInversion,
  aprobarSolicitudInversion,
  deleteSolicitudInversion
};