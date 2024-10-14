const connection = require("../database");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const categoria_posts = "SELECT * FROM categoria_posts";

  connection.query(categoria_posts, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).json({
        data: results,
        message: "Lista de categorias posts",
      });
    }
  });
});

router.post("/", (req, res) => {
  const { nombre } = req.body;

  const post = `INSERT INTO posts(nombre) VALUES ("${nombre}");`;

  connection.query(categoria_post, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Registro exitoso",
      });
    }
  });
});

router.put("/:categoria_id", (req, res) => {
  const { nombre } = req.body;
  const { categoria_id } = req.params;
  console.log(categoria_id);

  const producto = `UPDATE categoria_posts SET 
    nombre = '${nombre}',
  WHERE categoria = ${categoria_id};`;

  connection.query(categoria_post, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Actualizacion exitosa",
      });
    }
  });
});

router.delete("/:categoria_id", (req, res) => {
  const { categoria_id } = req.params;

  const post = `DELETE FROM posts WHERE categoria_id = ${categoria_id};`;

  connection.query(post, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Borrado exitoso",
      });
    }
  });
});

router.patch("/estado/:categoria_id", (req, res) => {
  const { categoria_id } = req.params;

  const post = `UPDATE categoria_posts SET estado = !estado WHERE categoria_id = ${categoria_id};`;

  connection.query(categoria_post, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).json({
        data: results,
        message: "Actualizacion de estado exitoso",
      });
    }
  });
});



module.exports = router;
