const crypto = require("crypto");
const salt = "asdfhlaskfhsasdsd";

const encriptar = (password) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("hex");
};

const contraseña = "51bc555894468fcc60b0";

console.log(
  encriptar("miContraseñadfasdfasfdas") == contraseña
    ? "Contraseña correcta"
    : "Contraseña incorrecta"
);
