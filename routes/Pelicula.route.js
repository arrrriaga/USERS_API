/**
 * 1.- Importar express
 * 2.- Instanciar enrutador
 * 3.- Importar controladores
 * 4.- Declaramos las rutas
 * 5.- Exportamos el enrutador
 */

//! 1.- Importar express
const express = require("express");
const auth = require("../middleware/auth");

//! 2.- Instanciar enrutador
const router = express.Router();

//! 3.- Importar controladores
const {
  nuevaPelicula,
  verPeliculas,
  eliminarPeliculaPorId,
  actualizarPelicula,
  verMisPeliculas,
} = require("../controllers");

//! 4.- Declaramos las rutas
router.post("/", auth, nuevaPelicula);
router.get("/getAll", auth, verPeliculas);
router.get("/misPeliculas", auth, verMisPeliculas);
router.delete("/:id", auth, eliminarPeliculaPorId);
router.put("/:id", auth, actualizarPelicula);

//! 5.- Exportamos el enrutador
module.exports = router;
