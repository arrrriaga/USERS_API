const mongoose = require("mongoose");
const Pelicula = mongoose.model("Pelicula");

const nuevaPelicula = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(403).json({
        mensaje: "Error",
        detalles: "Sólo un admin puede crear una película",
      });
    }

    //Creamos nuestro usuario con lo que viene del body
    const pelicula = new Pelicula({ ...req.body, uploader: req.user.idUser });

    const resp = await pelicula.save();

    return res.status(201).json({
      mensaje: "Pelicula creada",
      detalles: await resp.populate("uploader", "nombre"),
    });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verPeliculas = async (req, res) => {
  try {
    // const peliculas = await Pelicula.find().populate("uploader");
    const peliculas = await Pelicula.find().populate("uploader", "nombre");
    /* const peliculas = await Pelicula.find().populate({
      path: "uploader",
      select: {
        nombre: true,
        tipo: true,
      },
      populate: {
        path: "tipo",
        select: {
          nombre: true,
        },
      },
    }).populate({
      path: "otra",
      select: {
        nombre: true,
        tipo: true,
      },
      populate: {
        path: "tipo",
        select: {
          nombre: true,
        },
      },
    }); */
    if (!peliculas.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Colección vacía" });
    return res
      .status(200)
      .json({ mensaje: "Peliculas encontradas", detalles: peliculas });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verMisPeliculas = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: "No tienes permiso para ver esto",
      });
    }

    const peliculas = await Pelicula.find({
      uploader: req.user.idUser,
    }).populate("uploader", "nombre");
    if (!peliculas.length)
      return res
        .status(404)
        .json({
          mensaje: "Error",
          detalles: "Esste usuario no ha creado películas",
        });
    return res
      .status(200)
      .json({ mensaje: "Peliculas encontradas", detalles: peliculas });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const eliminarPeliculaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res
        .status(400)
        .json({ mensaje: "Error", detalles: "ID no válido" });
    const pelicula = await Pelicula.findById(id);
    if (!pelicula)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Pelicula no encontrado" });
    const eliminado = await Pelicula.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: "Pelicula eliminad", detalles: eliminado });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await Pelicula.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate("uploader", "nombre");
    return res
      .status(200)
      .json({ mensaje: "Pelicula actualizada", detalles: actualizado });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  nuevaPelicula,
  verPeliculas,
  eliminarPeliculaPorId,
  actualizarPelicula,
  verMisPeliculas,
};
