/**
 * 1.- Importar e instanciar mongoose
 * 2.- Crear el esquema
 * 3.- Exportar modelo
 */

//! 1.- Importar mongoose
require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

//! 2.- 2.- Crear el esquema
const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email inválido"],
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
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
});

UserSchema.plugin(uniqueValidator);

//! Funciones del modelo
//Generar pasword
UserSchema.methods.encryptString = function (stringToEncrypt, salt) {
  //No se puede crear como función flecha porque es una instancia y no permite usar "this"
  return crypto
    .pbkdf2Sync(stringToEncrypt, salt, 10000, 256, "sha512")
    .toString("hex");
};

UserSchema.methods.hashPassword = function (password) {
  //No se puede crear como función flecha porque es una instancia y no permite usar "this"
  this.salt = crypto.randomBytes(16).toString("hex"); //salt debe ser de 16 bites
  this.password = this.encryptString(password, this.salt);
};

//Verificar Password
UserSchema.methods.verifyPassword = function (password) {
  return this.password === this.encryptString(password, this.salt);
};

//Generar TOKEN
UserSchema.methods.generateJWT = function () {
  return jwt.sign({ idUser: this._id, tipo: this.tipo }, process.env.MY_SECRET);
};

UserSchema.methods.onSignGenerateJWT = function () {
  return {
    idUser: this._id,
    tipo: this.tipo,
    token: this.generateJWT(),
  };
};

//! Exprtar modelo
mongoose.model("User", UserSchema, "coleccionUser");
