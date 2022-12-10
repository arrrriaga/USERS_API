/*
1.- Importar Express
2.- Instanciar enrutador
3.- Importar controladores
4.- Declaramos las rutas
5.- Exportamos el enrutador
*/

//! 1.- Importamos express y MiddleWare
const express = require("express");
const auth = require("../middleware/auth");

//! 2.- Instanciar enrutador
const router = express.Router();

//! 3.- Importar controladores
const {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
} = require("../controllers");

//! 4.- Declaración de las rutas
router.post("/", registro);
router.post("/login", login);
router.get("/getAll", auth, verUsuarios);
router.get("/filtrar", auth, filtrarUsuarios);
router.delete("/:id", auth, eliminarUsuario);
router.delete("/", auth, eliminarUsuariosPorFiltro);
router.put("/:id", auth, actualizarUsuario);

//! 5.- Exportamos el enrutador
module.exports = router;
