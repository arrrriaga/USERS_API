const { path } = require("express/lib/application");
const mongoose = require("mongoose");
const Pelicula = mongoose.model("Pelicula");

const nuevaPelicula = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden crear las peliculas",
      });
    }
    //POST: Creamos nuestro Pelicula con lo que viene del body
    const pelicula = new Pelicula(req.body);
    const resp = await pelicula.save();

    return res.status(201).json({
      msg: "Pelicula creada",
      data: await resp.populate({
        path: "uploader",
        select: {
          nombre: true,
          tipo: true,
        },
      }),
    });
  } catch (e) {
    return res.status(400).json({ msg: "ERROR POST", detalles: e.message });
  }
};

const verPeliculas = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden ver las peliculas",
      });
    }
    // const Peliculas = await Pelicula.find().populate("uploader"); //Forma base, trae el User completo
    const Peliculas = await Pelicula.find().populate({
      path: "uploader",
      select: {
        nombre: true,
        tipo: true,
      },
      // populate: {
      //   path: "tipo",
      //   select: {
      //     nombre: true,
      //   },
      // },
    });
    if (!Peliculas.length) {
      return res
        .status(404)
        .json({ msg: "ERROR", detalles: "Colección vacía" });
    }
    return res
      .status(200)
      .json({ msg: "Peliculas encontradas", data: Peliculas });
  } catch (e) {
    return res.status(400).json({
      msg: "ERROR",
      detalles: e.message,
    });
  }
};

const filtrarPeliculas = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden ver las peliculas",
      });
    }
    const Peliculas = await Pelicula.find(req.body).populate({
      path: "uploader",
      select: {
        nombre: true,
      },
    });
    if (!Peliculas.length) {
      return res
        .status(404)
        .json({ msg: "ERROR", detalles: "Peliculas no encontrados" });
    }
    return res
      .status(200)
      .json({ msg: "Peliculas encontrados", data: Peliculas });
  } catch (e) {
    return res.status(400).json({
      msg: "ERROR",
      detalles: e.message,
    });
  }
};

const eliminarPelicula = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden eliminar las peliculas",
      });
    }
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(404).json({ msj: "ERROR", detalles: "ID no valido" });
    }
    const Pelicula = await Pelicula.findById(id);
    if (!Pelicula) {
      return res
        .status(404)
        .json({ msj: "ERROR", detalles: "Pelicula no encontrado" });
    }
    const eliminado = await Pelicula.findByIdAndDelete(id);
    return res.status(200).json({
      msj: "Pelicula eliminado",
      detalles: "eliminado",
      data: Pelicula,
    });
  } catch (e) {
    res.status(400).json({ msj: "ERROR", detalles: e.message });
  }
};

const eliminarPeliculasPorFiltro = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden eliminar las peliculas",
      });
    }
    const eliminados = await Pelicula.deleteMany(req.body);
    return res.status(200).json({
      msj: "Peliculas eliminado",
      detalles: eliminados,
    });
  } catch (e) {
    res.status(400).json({ msj: "ERROR", detalles: e.message });
  }
};

const actualizarPelicula = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      res.status(403).json({
        msj: "ERROR CRUD PELICULAS",
        detalles: "sólo los admin pueden actualizar las peliculas",
      });
    }
    const { id } = req.params;
    const actualizado = await Pelicula.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "uploader",
      select: {
        nombre: true,
      },
    });
    return res
      .status(200)
      .json({ msj: "Pelicula actualizada", detalles: actualizado });
  } catch (e) {
    return res.status(200).json({ msj: "ERROR", detalles: e.message });
  }
};
// const actualizarPelicula = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const actualizado = await Pelicula.findByIdAndUpdate(
//       id,
//       { $set: req.body },
//       { new: true }
//     );
//     return res
//       .status(200)
//       .json({ mensaje: "Pelicula actualizado", detalles: actualizado });
//   } catch (e) {
//     return res.status(400).json({ mensaje: "Error", detalles: e.message });
//   }
// };

module.exports = {
  nuevaPelicula,
  verPeliculas,
  filtrarPeliculas,
  eliminarPelicula,
  eliminarPeliculasPorFiltro,
  actualizarPelicula,
  //verPeliculas,
  //eliminarPelicula
};
