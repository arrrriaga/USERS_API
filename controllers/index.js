const {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
} = require("./User.controller");
const {
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
} = require("./Pelicula.controller");

module.exports = {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
};
