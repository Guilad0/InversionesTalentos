const express = require('express');
const router = express.Router();
const {connection} = require("../database");


const getExperiencia = (req, res) => {
  connection.query("SELECT * FROM experiencia", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ results });
  });
};

const postExperiencia = (req, res) => {
  const {
    cliente_id,
    institucion,
    cargo,
    actividades,
    fecha_inicio,
    fecha_final,
  } = req.body;

  const query =
    "INSERT INTO experiencia (cliente_id, institucion, cargo, actividades, fecha_inicio, fecha_final) VALUES (?, ?, ?,?,?,?)";

  connection.query(
    query,
    [cliente_id, institucion, cargo, actividades, fecha_inicio, fecha_final],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "Experiencia creada", id: results.insertId });
    }
  );
};

const putExperiencia = (req, res) => {
  const { institucion, cargo, actividades } = req.body;
  const queryExperiencia = "SELECT * FROM experiencia WHERE cliente_id = ? ";
  connection.query(queryExperiencia, [req.params.id], (error, data) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (data.length == 0) {
      return res.status(500).json({ error: error.message });
    }
    const query =
      "UPDATE experiencia SET institucion =?, cargo =?, actividades =? WHERE cliente_id =?";

    connection.query(
      query,
      [institucion, cargo, actividades, req.params.id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res
          .status(201)
          .json({ message: "Experiencia modificada", id: results.insertId });
      }
    );
  });
};

const patchExperiencia = (req, res) => {
  const { id } = req.params;

  const query =
    "UPDATE experiencia SET estado = !estado WHERE experiencia_id = ?";

  connection.query(query, [id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Movimiento eliminado" });
  });
};


router.get('/', getExperiencia);
router.post('/', postExperiencia);
router.put('/:id', putExperiencia);
router.patch('/:id', patchExperiencia);


module.exports = router;
