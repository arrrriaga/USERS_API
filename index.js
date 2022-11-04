/*
1.- Importar Express
2.- Crear modelos
3.- Crear controladores
4.- Crear rutas
5.- Hacer instancia de la aplicación
6.- Importar rutas
7.- Middlewares
8.- Levantar el servidor

*/
//! 1.- Importar variables de entorno
require("dotenv").config();

//! 2.- Importar los modelos
require("./models");

//! 3.- Importar Express, Mongoose & Router
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

//! 4.- Hacer instancia de la aplicación
const app = express();

//! 5.-Configurar Middeleares
app.use(express.json());
app.use(cors());

//! 6.- Conexión a Mongo
mongoose.connect(process.env.URI_MONGO_SERVER);

//! 7.- Definir rutas
app.use("/v1", routes);
app.use((req, res) => {
  res.send('<a href="/v1">Go to API v1</a>"');
});

//! 8.- Levantar Servidor
app.listen(process.env.PORT, () => {
  console.log(`Se ha iniciado el servidor en el puerto ${process.env.PORT}`);
});
