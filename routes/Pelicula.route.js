/*
1.- Importar Express
2.- Instanciar enrutador
3.- Importar controladores
4.- Declaramos las rutas
5.- Exportamos el enrutador
*/

//! 1.- Importamos express
const express = require("express");

//! 2.- Instanciar enrutador
const router = express.Router();

//! 3.- Importar controladores
const {
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
} = require("../controllers");

//! 4.- Declaración de las rutas
router.post("/", nuevaPelicula);
router.get("/getAll", verPeliculas);
router.get("/filtrar", filtrarPeliculas);
router.delete("/:id", eliminarPelicula);
router.delete("/", eliminarPeliculasPorFiltro);
router.put("/:id", actualizarPelicula);

//! 5.- Exportamos el enrutador
module.exports = router;
