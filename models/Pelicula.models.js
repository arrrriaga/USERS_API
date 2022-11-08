/**
 * 1.- Importar e instanciar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose
const mongoose = require("mongoose");

//! 2.- 2.- Crear el esquema
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
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

//! Exprtar modelo
mongoose.model("Pelicula", PeliculaSchema, "coleccionPelicula");
