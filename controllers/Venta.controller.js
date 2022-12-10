const mongoose = require("mongoose");
const Venta = mongoose.model("Venta");

const nuevaVenta = async (req, res) => {
  try {
    //Creamos la venta con lo que viene del body
    const venta = new Venta({ ...req.body, comprador: req.user.idUser });

    const resp = await venta.save();

    return res.status(201).json({
      mensaje: "Venta creada",
      detalles: await resp.populate("comprador", "nombre"),
    });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("comprador", "nombre")
      .populate({
        path: "productos",
        select: {
          nombre: true,
          price: true,
          uploader: true,
        },
        populate: {
          path: "uploader",
          select: {
            nombre: true,
          },
        },
      }); // [] === 0 ['pelicula'] === 1

    if (!ventas.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Colección vacía" });
    return res
      .status(200)
      .json({ mensaje: "Ventas encontradas", detalles: ventas });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  nuevaVenta,
  verVentas,
};
