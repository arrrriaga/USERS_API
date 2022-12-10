const mongoose = require("mongoose");
const User = mongoose.model("User");

const registro = async (req, res) => {
  try {
    //POST: Creamos nuestro usuario con lo que viene del body
    // console.log(req.user);
    // if (req.user.tipo !== "admin") {
    //   return res.status(403).json({
    //     msj: "ERROR",
    //     detalles: "Sólo un admin puede crear nuevos admins",
    //   });
    // }

    const { password } = req.body;
    delete req.body.password;

    const user = new User(req.body);
    user.hashPassword(password);

    await user.save();

    return res
      .status(201)
      .json({ msg: "Usuario creado", detalles: user.generateJWT() });
  } catch (e) {
    return res.status(400).json({ msg: "ERROR REGISTRO", detalles: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ correo });
    if (!user) {
      return res
        .status(404)
        .json({ msj: "ERROR LOGIN", detalles: "Usuario no encontrado" });
    }
    if (user.verifyPassword(password)) {
      return res
        .status(200)
        .json({ msj: "Login correcto", detalles: user.generateJWT() });
    }
    return res
      .status(400)
      .json({ msj: "RROR LOGIN", detalles: "Contraseña incorrecta" });
  } catch (e) {
    return res.status(400).json({ msj: "ERROR LOGIN", detalles: e.message });
  }
};

const verUsuarios = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.tipo !== "admin") {
      res.status(400).json({
        msj: "ERROR VER USUARIOS",
        detalles: "NO tienes permitida esta opción",
      });
    }
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
      msg: "ERROR VERUSUARIOS",
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
    const actualizado = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ msj: "Mensaje actualizado", detalles: actualizado });
  } catch (e) {
    return res.status(200).json({ msj: "ERROR", detalles: e.message });
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
      .json({ mensaje: "Usuarios encontrados", detalles: usuarioInfo });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  registro,
  login,
  verUsuarios,
  filtrarUsuarios,
  eliminarUsuario,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
  //verUsuarios,
  //eliminarUsuario
};
