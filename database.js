const mongoose = require("mongoose");

const uri = "mongodb+srv://olordjokovic:cerrojo120@cluster0.njnd2dn.mongodb.net/concesionarios?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;


