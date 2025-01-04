import express from "express";
import { User } from '../models/mainExport.js'
import {sequelize} from "../database.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { uploadFile } from "../helpers/uploadImage.js";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary} from "cloudinary";
import transporter from "../helpers/mailer.js";
import crypto from "crypto";
import middlewareControlAdmin from "../middlewares/middlewareControlAdmin.js";
import dotenv from 'dotenv';
import { getError500 } from "../helpers/Response.js";



var router = express.Router();
cloudinary.config(process.env.CLOUDINARY_URL);
dotenv.config();


const getUsers = async (req, res) => {
  try{ 
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err) {
        return res.status(err.status || 403).json({
          msg: err.message || "No tiene permisos para acceder a esta sección.",
        });
      }
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
  
      let query = `
      SELECT 
          u.usuario_id,
          u.nombre, 
          u.apellido, 
          u.aprobado,
          u.correo, 
          u.categoria_persona_id,
          u.username, 
          u.pais_residencia,
          u.edad, 
          u.aprobado,
          u.verificado,
          u.imagen,
          u.rol, 
          u.porcentaje_registro,
          u.estado,
          i.ocupacion, 
          i.descripcion, 
          i.monto_inversion, 
          i.cantidad_maxima_inversiones,
          i.preparacion, 
          i.video,
          i.estudios, 
          i.vision,
          c.nombre as categoria
      FROM 
          usuarios AS u
      LEFT JOIN 
          informacion AS i ON u.usuario_id = i.cliente_id
      LEFT JOIN 
          categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
      LIMIT ? OFFSET ?`;
  
      sequelize.query(query, [size, offset], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar clientes",
          });
          return;
        }
  
        const countQuery = `SELECT COUNT(*) AS total FROM usuarios`;
        sequelize.query(countQuery, (err, countResults) => {
          if (err) {
            res.status(500).json({
              msg: "Error al contar usuarios",
            });
            return;
          }
  
          const totalUsers = countResults[0].total;
          const totalPages = Math.ceil(totalUsers / size);
  
          const prevPage =
            page > 1 ? `/api/users?page=${page - 1}&size=${size}` : null;
          const nextPage =
            page < totalPages ? `/api/users?page=${page + 1}&size=${size}` : null;
  
          res.status(200).json({
            results,
            cant: results.length,
            total: totalUsers,
            totalPages: totalPages,
            currentPage: page,
            prev: prevPage,
            next: nextPage,
          });
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getUsersByname = async (req, res) => {
  try{ 
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err) {
        return res.status(err.status || 403).json({
          msg: err.message || "No tiene permisos para acceder a esta sección.",
        });
      }
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const searchTerm = req.params.id || "";
      const searchPattern = `${searchTerm}%`;
  
      let query = `
      SELECT 
          u.usuario_id,
          u.nombre, 
          u.apellido, 
          u.correo, 
          u.categoria_persona_id,
          u.username, 
          u.imagen,
          u.pais_residencia,
          u.aprobado,
          u.edad, 
          u.aprobado,
          u.verificado,
          u.rol, 
          u.estado,
          i.ocupacion, 
          i.descripcion, 
          i.monto_inversion, 
          i.cantidad_maxima_inversiones,
          i.preparacion, 
          i.estudios, 
          i.vision,
          c.nombre as categoria
      FROM 
          usuarios AS u
      LEFT JOIN 
          informacion AS i ON u.usuario_id = i.cliente_id
      LEFT JOIN 
          categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
      WHERE u.nombre LIKE ?
      LIMIT ? OFFSET ?`;
  
      sequelize.query(query, [searchPattern, size, offset], (err, results) => {
        if (err) {
          res.status(500).json({
            msg: "Error al buscar clientes",
          });
          return;
        }
  
        const countQuery = `SELECT COUNT(*) AS total FROM usuarios WHERE nombre LIKE ?`;
        sequelize.query(countQuery, [searchPattern], (err, countResults) => {
          if (err) {
            res.status(500).json({
              msg: "Error al contar usuarios",
            });
            return;
          }
  
          const totalUsers = countResults[0].total;
          const totalPages = Math.ceil(totalUsers / size);
  
          const prevPage =
            page > 1 ? `/api/users?page=${page - 1}&size=${size}` : null;
  
          const nextPage =
            results.length === size && page < totalPages
              ? `/api/users?page=${page + 1}&size=${size}`
              : null;
  
          res.status(200).json({
            results,
            cant: results.length,
            total: totalUsers,
            totalPages: totalPages,
            currentPage: page,
            prev: prevPage,
            next: nextPage,
          });
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const approvedUser = async (req, res) => {
  try{ 
    const handleError = (status, msg, err = null) =>
      res.status(status).json({ msg, err });
  
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err)
        return handleError(
          err.status || 403,
          err.message || "No tiene permisos para acceder a esta sección."
        );
  
      const getUserQuery = "SELECT * FROM usuarios WHERE usuario_id = ?";
      sequelize.query(getUserQuery, [req.params.id], (err, results) => {
        if (err) return handleError(500, "Error en la petición", err);
        if (results.length === 0)
          return handleError(404, "Usuario no encontrado");
        const currentApprovalState = results[0].aprobado;
        const toggleApprovalQuery =
          "UPDATE usuarios SET aprobado = !aprobado WHERE usuario_id = ?";
        sequelize.query(toggleApprovalQuery, [req.params.id], (err) => {
          if (err) return handleError(500, "Error al aprobar el usuario", err);
          const responseMsg =
            currentApprovalState === 0 ? "Usuario aprobado" : "Usuario rechazado";
          res.status(200).json({ msg: responseMsg });
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getUsersBynameAndRol = async (req, res) => {
  try{ 
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err) {
        return res.status(err.status || 403).json({
          msg: err.message || "No tiene permisos para acceder a esta sección.",
        });
      }
  
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const searchTerm = req.params.nombre || "";
      const searchPattern = `${searchTerm}%`;
  
      let query = `
      SELECT 
          u.usuario_id,
          u.nombre, 
          u.apellido, 
          u.aprobado,
          u.correo, 
          u.categoria_persona_id,
          u.username, 
          u.pais_residencia,
          u.edad, 
          u.aprobado,
          u.verificado,
          u.rol, 
          u.estado,
          i.ocupacion, 
          i.descripcion, 
          i.monto_inversion, 
          i.cantidad_maxima_inversiones,
          i.preparacion, 
          i.estudios, 
          i.vision,
          c.nombre as categoria
      FROM 
          usuarios AS u
      LEFT JOIN 
          informacion AS i ON u.usuario_id = i.cliente_id
      LEFT JOIN 
          categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
      WHERE u.nombre LIKE ? AND u.rol = ?
      LIMIT ? OFFSET ?`;
  
      sequelize.query(
        query,
        [searchPattern, req.query.rolUser, size, offset],
        (err, results) => {
          if (err) {
            res.status(500).json({
              msg: "Error al buscar clientes",
            });
            return;
          }
  
          const countQuery = `SELECT COUNT(*) AS total FROM usuarios u WHERE u.nombre LIKE ? AND u.rol = ?`;
          sequelize.query(
            countQuery,
            [searchPattern, req.query.rolUser],
            (err, countResults) => {
              if (err) {
                res.status(500).json({
                  msg: "Error al contar usuarios",
                });
                return;
              }
  
              const totalUsers = countResults[0].total;
              const totalPages = Math.ceil(totalUsers / size);
  
              const prevPage =
                page > 1 ? `/api/users?page=${page - 1}&size=${size}` : null;
  
              const nextPage =
                results.length === size && page < totalPages
                  ? `/api/users?page=${page + 1}&size=${size}`
                  : null;
  
              res.status(200).json({
                results,
                cant: results.length,
                total: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                prev: prevPage,
                next: nextPage,
              });
            }
          );
        }
      );
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getInfoInvestor = async (req, res) => {
  try{ 
      let query = `
      SELECT
      u.nombre, 
      u.apellido, 
      u.correo, 
      u.categoria_persona_id,
      u.username, 
      u.pais_residencia,
      u.edad, 
      u.aprobado,
      u.verificado,
      u.rol, 
      u.estado,
      u.created_at,
      u.genero,
      i.nombre_completo, 
      i.dni, 
      i.tipo_dni, 
      i.domicilio,
      i.ciudad,
      i.situacion_laboral, 
      i.fuente_de_ingresos,
      c.nombre as categoria
      from usuarios as u
      LEFT JOIN
      informacion_inversionista AS i ON u.usuario_id = i.id_inversionista
      LEFT JOIN
      categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
      WHERE 
      u.usuario_id = ?
      `;
      sequelize.query(query, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
          nsg: "Error en la transacccion",
        });
        return;
      }
      if (results.length == 0) {
        res.status(500).json({
          ok: false,
          err,
          nsg: "Informacion del usuario no enconmtrada",
        });
        return;
      }
      res.status(200).json({
        results,
        });
      });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getUsersByRol = async (req, res) => {
  try{ 
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err) {
        return res.status(err.status || 403).json({
          msg: err.message || "No tiene permisos para acceder a esta sección.",
        });
      }
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const rol = req.params.rol;
  
      let query = `
        SELECT 
            u.usuario_id,
            u.nombre, 
            u.apellido, 
            u.correo, 
            u.categoria_persona_id,
            u.username, 
            u.pais_residencia,
            u.edad, 
            u.aprobado,
            u.verificado,
            u.rol, 
            u.porcentaje_registro,
            u.estado,
            u.imagen,
            i.ocupacion, 
            i.descripcion, 
            i.monto_inversion, 
            i.cantidad_maxima_inversiones,
            i.preparacion, 
            i.estudios, 
            i.vision,
            i.video,
            c.nombre as categoria
        FROM 
            usuarios AS u
        LEFT JOIN 
            informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
            categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
        WHERE 
            u.rol = ?
        LIMIT ? OFFSET ?`;
      sequelize.query(query, [rol, size, offset], (err, results) => {
        if (err) {
          return res.status(500).json({
            msg: "Error al buscar usuarios",
          });
        }
        const countQuery = `SELECT COUNT(*) AS total FROM usuarios WHERE rol = ?`;
        sequelize.query(countQuery, [rol], (err, countResults) => {
          if (err) {
            return res.status(500).json({
              msg: "Error al contar usuarios",
            });
          }
          const totalUsers = countResults[0].total;
          const totalPages = Math.ceil(totalUsers / size);
          const prevPage =
            page > 1
              ? `/api/users?page=${page - 1}&size=${size}&rol=${rol}`
              : null;
          const nextPage =
            page < totalPages
              ? `/api/users?page=${page + 1}&size=${size}&rol=${rol}`
              : null;
          res.status(200).json({
            results,
            cant: results.length,
            total: totalUsers,
            totalPages: totalPages,
            currentPage: page,
            prev: prevPage,
            next: nextPage,
          });
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const postUser = async (req, res) => {
  try{ 
    const {
      nombre,
      apellido,
      correo,
      codigo_pais,
      numero_telefono,
      pais_residencia,
      password,
      acepta_terminos,
      categoria_persona_id,
      username,
      edad,
      registrado_por,
      rol,
      gender,
    } = req.body;
    let verificadoUser = registrado_por == "" ? 0 : 1;
  
    if (acepta_terminos == "0") {
      return res.status(500).json({
        msg: "Debe aceptar las condiciones y terminos",
      });
    }
    const query2 = `SELECT * FROM usuarios WHERE correo = ?`;
    sequelize.query(query2, [correo], async (error, results) => {
      if (results.length > 0) {
        return res.status(500).json({
          msg: "El correo ya esta en uso",
        });
      }
      const sql =
        "INSERT INTO usuarios ( nombre, apellido, correo, codigo_pais, numero_telefono,username, pais_residencia, password,edad, acepta_terminos, categoria_persona_id, rol, cod_verificacion,verificado,registrado_por, genero) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
      let passwordHash = await bcrypt.hash(password, 10);
      const verificationCode = crypto.randomBytes(20).toString("hex");
      const values = [
        nombre,
        apellido,
        correo,
        codigo_pais,
        numero_telefono,
        username,
        pais_residencia,
        passwordHash,
        edad,
        acepta_terminos,
        categoria_persona_id,
        rol,
        verificationCode,
        verificadoUser,
        registrado_por,
        gender,
      ];
      sequelize.query(sql, values, (error, results) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          const verificationLink = `${process.env.URL_BASE}/users/verify/${results.insertId}`;
          const loginLink = `${process.env.URL_BASE}/sign-login`;
          const msgHtml =
            verificadoUser == 0
              ? `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido</title>
            <style>
                .mail-container {
                    background-color: #ff;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .mail-header {
                    background-color: #17223B;;
                    padding: 10px;
                    border-radius: 10px 10px 0 0;
                    text-align: center;
                    color: white;
                }
                .mail-content {
                    padding: 20px;
                }
                .verification-link {
                    background-color: #F37926;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .mail-footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div class="mail-container">
                <div class="mail-header">
                    <h1 style="margin: 0;">¡Sólo falta un paso!</h1>
                </div>
                <div class="mail-content">
                    <p>Estimado usuario,</p>
                    <p>Gracias por registrarte en nuestra plataforma. Realiza la verificación y podrás acceder a todos nuestros servicios.</p>
                    <p>A continuación te mostramos el código de verificación de tu cuenta:</p>
                    <strong>${verificationCode}</strong>
                    <p>Para verificar tu cuenta, haz click en el siguiente enlace:</p>
                    <a class="verification-link" href="${verificationLink}">Verificar cuenta</a>
                </div>
                <div class="mail-footer">
                    <p>&copy; 2024 Talento Inversiones. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
                          `
              : `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido</title>
            <style>
                .mail-container {
                    background-color: #ff;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .mail-header {
                    background-color: #17223B;;
                    padding: 10px;
                    border-radius: 10px 10px 0 0;
                    text-align: center;
                    color: white;
                }
                .mail-content {
                    padding: 20px;
                }
                .verification-link {
                    background-color: #F37926;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .mail-footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div class="mail-container">
                <div class="mail-header">
                    <h1 style="margin: 0;">¡Bienvenido a Nuestra Plataforma!</h1>
                </div>
                <div class="mail-content">
                    <p>Estimado usuario,</p>
                    <p>Gracias por registrarte en nuestra plataforma. Hemos comletado tu registro.</p>
                    <p>Tus credenciales de acceso son:</p>
                    <strong>Email: ${correo}</strong><br>
                    <strong>Contraseña: ${password}</strong>
                    <p>Para iniciar sesión, haz click en el siguiente enlace:</p>
                    <a class="verification-link" href="${loginLink}">Iniciar sesión</a>
                </div>
                <div class="mail-footer">
                    <p>&copy; 2024 Talento Inversiones. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
                          `;
          const mailOptions = {
            from: process.env.GG_EMAIL,
            to: correo,
            subject: "Verifica tu cuenta",
            text: `Por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
            html: msgHtml,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error)
              return res
                .status(500)
                .send("Error al enviar el correo de verificación");
            res.send(
              "Registro exitoso, revisa tu correo para verificar tu cuenta."
            );
          });
        }
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const verifyEmail = async (req, res) => {
  try{ 
    const userId = req.params.id;
    const query = `SELECT * FROM usuarios WHERE usuario_id = ?`;
    sequelize.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).send("Error al verificar el código");
      }
  
      if (results.length === 0) {
        return res.status(404).send("Usuario no encontrado");
      }
  
      const updateQuery = `UPDATE usuarios SET verificado = 1 WHERE usuario_id = ?`;
      sequelize.query(updateQuery, [userId], (updateErr, updateResults) => {
        if (updateErr) {
          return res
            .status(500)
            .send("Error al actualizar el estado de verificación");
        }
        const htmlResponse = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verificación Exitosa</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      padding: 20px;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background: white;
                      padding: 20px;
                      border-radius: 5px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #4CAF50;
                  }
                  p {
                      font-size: 16px;
                  }
                  a {
                      color: #4CAF50;
                      text-decoration: none;
                      font-weight: bold;
                  }
                  a:hover {
                      text-decoration: underline;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Verificación Exitosa</h1>
                  <p>¡Felicidades! Tu cuenta ha sido verificada exitosamente.</p>
                  <p>Ahora puedes iniciar sesión en tu cuenta y comenzar a disfrutar de todos nuestros servicios.</p>
                  <p><a href="http://localhost:5173/sign-login">Iniciar sesión</a></p>
              </div>
          </body>
          </html>
        `;
        res.send(htmlResponse);
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const putStateusers = async (req, res) => {
  try{ 
    middlewareControlAdmin(req.query.rol)(req, res, (err) => {
      if (err) {
        return res.status(err.status || 403).json({
          msg: err.message || "No tiene permisos para acceder a esta sección.",
        });
      }
      let sql = `select * from usuarios where usuario_id=${req.params.id}`;
      sequelize.query(sql, (error, results) => {
        if (error) {
          res.status(500).json({
            msg: "Error al realizar la peticion",
          });
        } else {
          if (results.length == 0) {
            res.status(500).json({
              msg: `El usuario con el id ${req.params.id} no existe`,
            });
          } else {
            user = results[0];
            sql = "update usuarios set estado=!estado where usuario_id = ?";
            sequelize.query(sql, [req.params.id], (error) => {
              if (error) {
                res.status(500).json({
                  msg: "Error en la petición",
                  error: error.message,
                });
              } else {
                res.status(201).json({
                  msg: user.estado == 0 ? "Estado activo" : "Estado inactivo",
                });
              }
            });
          }
        }
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const addInfClient = async (req, res) => {
  try{ 
    const {
      cliente_id,
      ocupacion,
      descripcion,
      monto_inversion,
      cantidad_maxima_inversiones,
      preparacion,
      estudios,
      vision,
    } = req.body;
  
    let query = "select * from usuarios where usuario_id=?";
    sequelize.query(query, [cliente_id], (err, results) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ msg: "El usuario no existe" });
      }
  
      query = "select * from informacion where cliente_id = ?";
      sequelize.query(query, [cliente_id], (err, data) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
  
        if (data.length > 0) {
          return res
            .status(400)
            .json({ msg: "El usuario ya cuenta con una informacion" });
        }
        query = "update usuarios set categoria_persona_id = categoria_persona_id where usuario_id = ?";
        sequelize.query(query, [cliente_id], (err) => {
          if (err) {
            return res.status(500).json({ err: err.message });
          }
          query =
            "insert into informacion (cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision) values (?,?,?,?,?,?,?,?)";
          const values = [
            cliente_id,
            ocupacion,
            descripcion,
            monto_inversion,
            cantidad_maxima_inversiones,
            preparacion,
            estudios,
            vision,
          ];
  
          sequelize.query(query, values, (err) => {
            if (err) {
              return res.status(500).json({ err: err.message });
            }
            res
              .status(201)
              .json({
                msg: "Informacion agregada y categoria_persona_id actualizada",
              });
          });
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const putClientInfo = async (req, res) => {
  try{ 
    const {
      ocupacion,
      descripcion,
      monto_inversion,
      cantidad_maxima_inversiones,
      preparacion,
      estudios,
      vision,
    } = req.body;
    let query = `select * from informacion where cliente_id = ${req.params.id}`;
    sequelize.query(query, (err, data) => {
      if (err) {
        res.status(400).json({
          err,
        });
        return;
      }
      if (data.length == 0) {
        res.status(400).json({
          msg: "El usuario no cuenta con informacion",
        });
        return;
      }
      query =
        "update informacion set   ocupacion=?, descripcion=?, monto_inversion=?, cantidad_maxima_inversiones=?, preparacion=?, estudios=?, vision=? where cliente_id=?";
      const values = [
        ocupacion,
        descripcion,
        monto_inversion,
        cantidad_maxima_inversiones,
        preparacion,
        estudios,
        vision,
        req.params.id,
      ];
      sequelize.query(query, values, (err) => {
        if (err) {
          res.status(400).json({
            err,
          });
          return;
        }
        res.status(201).json({
          msg: "Inforamcion actualizada",
        });
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getInfoClientById = async (req, res) => {
  try{ 
    let sql = "select * from informacion where cliente_id=?";
    sequelize.query(sql, [req.params.id], (error, results) => {
      console.log(results);
      if (error) {
        res.status(500).json({
          error,
        });
        return;
      }
  
      res.status(500).json({
        data: results,
        cant: results.length,
      });
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const uploadimageUser = async (req, res) => {
  try{ 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      res.status(400).json({
        msg: "Sin archivos para subir",
      });
      return;
    }
  
    let query = "SELECT * FROM usuarios WHERE usuario_id = ?";
    sequelize.query(query, [req.params.id], async (err, results) => {
      if (err) {
        res.status(500).json({
          err,
        });
        return;
      }
  
      if (results.length === 0) {
        return res.status(404).json({
          msg: "Usuario no encontrado",
        });
      }
  
      const oldImgPath = results[0].imagen;
      if (oldImgPath) {
        const fullPath = path.join(__dirname, "../uploads/images", oldImgPath);
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen anterior:", err);
          }
        });
      }
  
      try {
        const imgPath = await uploadFile(req.files);
        query = `UPDATE usuarios SET imagen = ? WHERE usuario_id = ?`;
        sequelize.query(query, [imgPath, req.params.id], (err) => {
          if (err) {
            res.status(500).json({
              err,
            });
            return;
          }
          res.status(201).json({
            ok: "Imagen cargada",
          });
        });
      } catch (err) {
        res.status(400).json({
          err,
        });
      }
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const createUrlImg = async (req, res) => {
  try{ 
    let query = "select * from usuarios where usuario_id=?";
    sequelize.query(query, [req.params.id], (err, data) => {
      if (err) {
        res.status(500).json({
          err,
        });
        return;
      }
      if (data.length == 0) {
        res.status(500).json({
          err,
        });
        return;
      }
      let userImg = data[0].imagen;
      const pathImg = path.join(__dirname, "../uploads/images/", userImg);
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getUserById = async (req, res) => {
  try{ 
    const query = `
    SELECT 
        u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.rol, 
        u.aprobado,
        u.estado,
        u.codigo_pais,
        u.numero_telefono,
        u.genero,
        u.estado,
        u.created_at,
        u.imagen,
        u.verificado,
        u.aprobado,
        i.ocupacion, 
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision,
        i.monto_inversion,
        i.cantidad_maxima_inversiones,
        c.nombre as categoria
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
    LEFT JOIN 
        categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
    WHERE u.usuario_id = :userId;   
    `;
  try {
    const [results, metadata] = await sequelize.query(query, {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (results.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    console.log(results);
    res.status(200).json({
      ok: true,
      results,
    });
  } catch (e) { 
    console.error("Error al ejecutar la consulta:", e);
    res.status(500).json({
      ok: false,
      message: "Error al buscar usuarios",
      e,
    });
  }
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};

const getSolInvById = async (req,res)=>{
  try{ 
    let query = `
    select 
      id,
      descripcion,
      fecha_inicio_recaudacion,
      fecha_fin_recaudacion,
      monto,
      aprobado
      from solicitudes_inversion
      where cliente_id = ${req.params.id} AND aprobado = 'Aprobado'
    `;
    sequelize.query(query,(err,results)=>{
      if (err) {
        return res.status(500).send({ message: "Error en la consulta" });
      }
      results[0].fecha_fin_recaudacion = new Date(results[0].fecha_fin_recaudacion)
      .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      results[0].fecha_inicio_recaudacion = new Date(results[0].fecha_inicio_recaudacion)
      .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      res.status(200).json({ results:results[0] })
    })
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
}

const handleEmail = async (req, res) => {
  try{
    const correo = req.query.correo;
    const query = `SELECT * FROM usuarios WHERE correo = ?;`;
  
    sequelize.query(query, [correo], (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error en la consulta" });
      }
  
      if (results.length > 0) {
        res.send({ existe: true });
      } else {
        res.send({ existe: false });
      }
    });
  } catch(e) { 
    getError500('Error en la consulta!', e, res);
  }
};

const handleTelefono = async (req, res) => {
  try{ 
    const telefono = req.query.telefono;
    const query = `SELECT * FROM usuarios WHERE numero_telefono = ?;`;
  
    sequelize.query(query, [telefono], (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error en la consulta" });
      }
  
      if (results.length > 0) {
        res.send({ existe: true });
      } else {
        res.send({ existe: false });
      }
    });
  } catch(e) {
    getError500('Error en la consulta!', e, res);
  }
};


router.get("/", getUsers);
router.get("/getInfoInvestor/:id", getInfoInvestor);
router.get("/filterUsersByName/:id", getUsersByname);
router.get("/filterUsersByNameAndRol/:nombre", getUsersBynameAndRol);
router.get("/filterByRol/:rol", getUsersByRol);
router.post("/", postUser);
router.put("/Stateinvestors/:id", putStateusers);
router.post("/upload/:id", uploadimageUser);
router.get("/clients/info/:id", getInfoClientById);
router.post("/info/", addInfClient);
router.put("/info/:id", putClientInfo);
router.get("/image/:id", createUrlImg);
router.get("/verify/:id", verifyEmail);
router.get("/getUserById/:id", getUserById);
router.get("/handleEmail/correo", handleEmail);
router.get("/handleTelefono/telefono", handleTelefono);
router.patch("/approved/:id", approvedUser);
router.get("/getSolInvById/:id", getSolInvById);
      

export default router;
