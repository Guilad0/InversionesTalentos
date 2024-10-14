const connection = require("../database");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const posts = "SELECT * FROM posts";

  connection.query(posts, (err, results) => {
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
        message: "Lista de posts",
      });
    }
  });
});

router.post("/", (req, res) => {
  const { autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado } = req.body;

  const post = `INSERT INTO posts(autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado) VALUES ("${autor_id}", "${categoria_id}", "${titulo}", "${resumen}", "${imagen_portada}", "${fecha_hora}", "${contenido}", "${estado}");`;

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
        message: "Registro exitoso",
      });
    }
  });
});

router.put("/:post_id", (req, res) => {
  const { autor_id, categoria_id, titulo, resumen, imagen_portada, fecha_hora, contenido, estado } = req.body;
  const { id } = req.params;
  console.log(id);

  const producto = `UPDATE posts SET 
    autor_id = '${autor_id}',
    categoria_id = '${categoria_id}',
    titulo = '${titulo}',
    resumen = '${resumen}',
    imagen_portada = '${imagen_portada}',
    fecha_hora = '${fecha_hora}',
    contenido = '${contenido}',
    estado = '${estado}',
    updated_at = CURRENT_TIMESTAMP()
  WHERE post_id = ${post_id};`;

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
        message: "Actualizacion exitosa",
      });
    }
  });
});

router.delete("/:post_id", (req, res) => {
  const { post_id } = req.params;

  const post = `DELETE FROM posts WHERE post_id = ${post_id};`;

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

router.patch("/estado/:post_id", (req, res) => {
  const { post_id } = req.params;

  const post = `UPDATE posts SET estado = !estado WHERE post_id = ${post_id};`;

  connection.query(post, (err, results) => {
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
