/**
 * 1.- Importar e instanciar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose
const mongoose = require("mongoose");

//! 2.- 2.- Crear el esquema
const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  planeta: {
    type: String,
    default: "tierra",
  },
  edad: {
    type: Number,
    min: [18, "Necesitas 18 para poder beber"],
    max: [100, "Superaste el rango de edad"],
  },
  tipo: {
    type: String,
    enum: ["cliente", "admin", "vendedor, limpieza"],
    default: "cliente",
  },
});

//! Exprtar modelo
mongoose.model("User", UserSchema, "coleccionUser");
