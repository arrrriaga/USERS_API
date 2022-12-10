const express = require("express");
const router = express.Router();
const userRouter = require("./User.route");
const peliculaRouter = require("./Pelicula.route");
const ventaRouter = require("./Venta.route");

router.get("/", (req, res) => {
  res.send(`
  <h1>Welcome to my API </h1>
  `);
});

router.use("/user", userRouter); //para las llamadas tendremos que colocar user primero. Example: /user/getall
router.use("/pelicula", peliculaRouter);
router.use("/venta", ventaRouter);

module.exports = router;
