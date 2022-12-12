const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/C7_API");

const Persona = mongoose.model("Persona", {
  nombre: String,
  edad: Number,
  activo: Boolean,
});

const persona = new Persona({
  nombre: "Juan",
  edad: 17,
  activo: false,
});

persona.save().then(() => {
  console.log("Guardado");
});

Persona.find({ nombre: "Juan" }).then((personas) => {
  console.log(personas);
});
