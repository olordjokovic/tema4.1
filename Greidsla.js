const mongoose = require("mongoose");

const PucketSchema = new mongoose.Schema({
  descripcion: String,
  precio: Number,
  cantidad: Number,
});

const GreidslaSchema = new mongoose.Schema({
  nombre: String,
  fecha: Date,
  ciudad: String,
  puckets: [PucketSchema],
});

module.exports = mongoose.model("Greidsla", GreidslaSchema);
