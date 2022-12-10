const {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
} = require("./User.controller");
const {
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
} = require("./Pelicula.controller");

const { nuevaVenta, verVentas } = require("./Venta.controller");

module.exports = {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
  nuevaVenta,
  verVentas,
};
