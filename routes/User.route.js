/**
 * 1.- Importar express
 * 2.- Instanciar enrutador
 * 3.- Importar controladores
 * 4.- Declaramos las rutas
 * 5.- Exportamos el enrutador
 */

//! 1.- Importar express & Middleware
const express = require("express");
const auth = require("../middleware/auth");

//! 2.- Instanciar enrutador
const router = express.Router();

//! 3.- Importar controladores
const {
  registro,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  login,
  verInfoUsuario,
  verUsuario,
} = require("../controllers");

//! 4.- Declaramos las rutas
router.post("/", registro);
router.post("/login", login);
router.get("/", auth, verInfoUsuario);
router.get("/getAll", auth, verUsuarios);
router.get("/filtrar", auth, filtrarUsuarios);
router.get("/:id", auth, verUsuario);
router.delete("/:id", auth, eliminarUsuarioPorId);
router.delete("/", auth, eliminarUsuariosPorFiltro);
router.put("/:id", auth, actualizarUsuario);

//! 5.- Exportamos el enrutador
module.exports = router;
