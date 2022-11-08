const crypto = require("crypto");
const salt = "asdfghjkl";

const encriptar = (password) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex"); //función síncrona
};

console.log(encriptar("miPassword"));
console.log("SALT", salt);
