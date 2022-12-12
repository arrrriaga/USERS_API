/**
 * 1.- Importar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose
const mongoose = require("mongoose");

//! 2.- Crear el esquema
const PeliculaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  año: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
  },
  uploader: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

//! 3.- Exportar modelo
mongoose.model("Pelicula", PeliculaSchema, "coleccionPelicula");
