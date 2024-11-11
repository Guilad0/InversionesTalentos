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
        var query = ` SELECT rol, COUNT(*) AS cantidadInversiones FROM inversiones;`;
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

module.exports = router;
