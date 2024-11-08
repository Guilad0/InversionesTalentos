const { response: res, request: req } = require("express");
const conexion = require("../database");
const getInformacion = (req, res) => {
  conexion.query("SELECT * FROM informacion", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ results });
  });
};
const postInformacion = (req, res) => {
  const { cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;

  const query =
    "INSERT INTO informacion (cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision) VALUES (?, ?, ?,?,?,?,?,?,)";

  conexion.query(query, [cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(201)
      .json({ message: "Informacion registrada", id: results.insertId });
  });
};
 
 

module.exports = {
  getInformacion,
  postInformacion,
};
