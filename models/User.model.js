/**
 * 1.- Importar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose & Crypto
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

//! 2.- Crear el esquema
const UserSchema = new mongoose.Schema({
  img: {
    type: String,
    default:
      "https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg",
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email inválido"],
  },
  planeta: {
    type: String,
    default: "Tierra",
  },
  edad: {
    type: Number,
    min: [18, "Tienes que ser mayor de edad."],
    max: [100, "Superaste el rango de edad."],
  },
  tipo: {
    type: String,
    enum: ["cliente", "admin", "vendedor", "limpieza"],
    default: "cliente",
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
});

UserSchema.plugin(uniqueValidator);

//! Funciones del modelo
UserSchema.methods.encryptString = function (stringToEncrypt, salt) {
  return crypto
    .pbkdf2Sync(stringToEncrypt, salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = this.encryptString(password, this.salt);
};

UserSchema.methods.verifyPassword = function (password) {
  return this.password === this.encryptString(password, this.salt);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ idUser: this._id, tipo: this.tipo }, process.env.SECRET);
};

UserSchema.methods.onSingGenerateJWT = function () {
  return {
    idUser: this._id,
    tipo: this.tipo,
    token: this.generateJWT(),
  };
};

//! 3.- Exportar modelo
mongoose.model("User", UserSchema, "coleccionUser");
