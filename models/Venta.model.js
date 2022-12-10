/**
 * 1.- Importar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose
const mongoose = require("mongoose");

//! 2.- Crear el esquema
const VentaSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    comprador: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    productos: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "Pelicula",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

//! 3.- Exportar modelo
mongoose.model("Venta", VentaSchema, "coleccionVenta");
