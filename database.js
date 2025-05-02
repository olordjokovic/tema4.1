// database.js
const mongoose = require("mongoose");

const uri = "mongodb+srv://olordjokovic:cerrojo120@cluster0.njnd2dn.mongodb.net/concesionarios?retryWrites=true&w=majority&appName=Cluster0
"; // Cambia si es necesario

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("🟢 Conectado a MongoDB");
  } catch (err) {
    console.error("🔴 Error de conexión:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
