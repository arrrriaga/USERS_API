const mongoose = require("mongoose");
const User = mongoose.model("User");

const registro = async (req, res) => {
  try {
    //POST: Creamos nuestro usuario con lo que viene del body
    const user = new User(req.body);
    const resp = await user.save();

    return res.status(201).json({ msg: "Usuario creado", data: resp });
  } catch (e) {
    return res.status(400).json({ msg: "ERROR", detalles: e.message });
  }
};

const verUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    if (!usuarios.length) {
      return res
        .status(404)
        .json({ msg: "ERROR", detalles: "Colección vacía" });
    }
    return res
      .status(200)
      .json({ msg: "Usuarios encontrados", data: usuarios });
  } catch (e) {
    return res.status(400).json({
      msg: "ERROR",
      detalles: e.message,
    });
  }
};

const filtrarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(req.body);
    if (!usuarios.length) {
      return res
        .status(404)
        .json({ msg: "ERROR", detalles: "Usuarios no encontrados" });
    }
    return res
      .status(200)
      .json({ msg: "Usuarios encontrados", data: usuarios });
  } catch (e) {
    return res.status(400).json({
      msg: "ERROR",
      detalles: e.message,
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(404).json({ msj: "ERROR", detalles: "ID no valido" });
    }
    const usuario = await User.findById(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ msj: "ERROR", detalles: "Usuario no encontrado" });
    }
    const eliminado = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ msj: "Usuario eliminado", detalles: "eliminado", data: usuario });
  } catch (e) {
    res.status(400).json({ msj: "ERROR", detalles: e.message });
  }
};

const eliminarUsuariosPorFiltro = async (req, res) => {
  try {
    const eliminados = await User.deleteMany(req.body);
    return res.status(200).json({
      msj: "Usuarios eliminado",
      detalles: eliminados,
    });
  } catch (e) {
    res.status(400).json({ msj: "ERROR", detalles: e.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ mensaje: "Usuario actualizado", detalles: actualizado });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  registro,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  //verUsuarios,
  //eliminarUsuario
};
