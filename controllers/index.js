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
} = require("./User.controller");

const {
  nuevaPelicula,
  verPeliculas,
  eliminarPeliculaPorId,
  actualizarPelicula,
  verMisPeliculas,
} = require("./Pelicula.controller");

const { nuevaVenta, verVentas } = require("./Venta.controller");

module.exports = {
  registro,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  nuevaPelicula,
  verPeliculas,
  eliminarPeliculaPorId,
  actualizarPelicula,
  login,
  verInfoUsuario,
  nuevaVenta,
  verVentas,
  verUsuario,
  verMisPeliculas,
};
