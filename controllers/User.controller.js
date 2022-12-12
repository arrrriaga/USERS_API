const mongoose = require("mongoose");
const User = mongoose.model("User");

const registro = async (req, res) => {
  try {
    //Creamos nuestro usuario con lo que viene del body
    const { password } = req.body;

    delete req.body.password;

    const user = new User(req.body);

    user.hashPassword(password);

    await user.save();

    return res
      .status(201)
      .json({ mensaje: "Usuario creado", detalles: user.onSingGenerateJWT() });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const login = async (req, res) => {
  try {
    //Creamos nuestro usuario con lo que viene del body
    const { correo, password } = req.body;

    const user = await User.findOne({ correo });

    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Usuario no encontrado" });
    }

    if (user.verifyPassword(password)) {
      return res.status(200).json({
        mensaje: "Login correcto",
        detalles: user.onSingGenerateJWT(),
      });
    }

    return res
      .status(400)
      .json({ mensaje: "Error", detalles: "Contraseña incorrecta" });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verUsuarios = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: "No tienes permiso para ver esto",
      });
    }
    const usuarios = await User.find(
      {},
      {
        nombre: true,
        apellido: true,
        correo: true,
        edad: true,
        tipo: true,
        img: true,
      }
    );
    if (!usuarios.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Colección vacía" });
    return res
      .status(200)
      .json({ mensaje: "Usuarios encontrados", detalles: usuarios });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verUsuario = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: "No tienes permiso para ver esto",
      });
    }
    console.log(req.query);
    const usuario = await User.findById(req.params.id);
    if (!usuario)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "No existe este usuario" });
    return res
      .status(200)
      .json({ mensaje: "Usuario encontrado", detalles: usuario });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const filtrarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(req.body);
    if (!usuarios.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Usuarios no encontrados" });
    return res
      .status(200)
      .json({ mensaje: "Usuarios encontrados", detalles: usuarios });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const eliminarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res
        .status(400)
        .json({ mensaje: "Error", detalles: "ID no válido" });
    const usuario = await User.findById(id);
    if (!usuario)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Usuario no encontrado" });
    const eliminado = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: "Usuario eliminado", detalles: eliminado });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const eliminarUsuariosPorFiltro = async (req, res) => {
  try {
    const eliminados = await User.deleteMany(req.body);
    return res
      .status(200)
      .json({ mensaje: "Usuarios eliminados", detalles: eliminados });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
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

const verInfoUsuario = async (req, res) => {
  try {
    const usuarioInfo = await User.findById(req.user.idUser, {
      nombre: 1,
      correo: 1,
      tipo: 1,
      edad: 1,
      img: 1,
      apellido: 1,
    });
    if (!usuarioInfo)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Este usuario no existe." });
    return res
      .status(200)
      .json({ mensaje: "Usuario encontrado", detalles: usuarioInfo });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  registro,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  login,
  verInfoUsuario,
  verUsuario,
};
