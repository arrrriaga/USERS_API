//! 1.- Importar variables de entorno
require("dotenv").config();

//! 2.- Importar los modelos
require("./models");

//! 3.- Importar Express, mongoose & Router
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

//! 4.- Hacer instancia de la aplicación
const app = express();

//! 5.- Configurar Middlewares
/* const whitelist = ["http://example1.com", "http://example2.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
); */
app.use(cors());
app.use(express.json());

//! 6.- Conexión a mongo
mongoose.connect(process.env.URI_MONGO);

//! 7.- Definir rutas
app.use("/v1", routes);

app.use((req, res) => {
  res.send('<a href="/v1">Go to API V1.2</a>');
});

//! 8.- Levantar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto: ${process.env.PORT}`);
});
