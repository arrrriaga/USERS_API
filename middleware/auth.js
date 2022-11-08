//Este file sirve para saber si nuetro usuario está autorizado para ejecutar ciertas rutas

const jwt = require("express-jwt");
const secret = process.env.MY_SECRET;

const getToken = (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return null;
  }
  const [type, token] = authorization.split(" ");

  return type === "Bearer" || type === "Token" ? token : null;
};

const auth = jwt({
  secret,
  algorithms: ["HS256"],
  userProperty: "user",
  getToken,
});

module.exports = auth;
