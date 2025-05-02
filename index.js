const express = require("express");
const connectDB = require("./feature/database-connection/database"); // Ruta según tu estructura
const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

// Conectar a la base de datos y arrancar el servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
  });
});

// Datos simulados
let concesionarios = [
  {
    id: 1,
    nombre: "AutoMadrid",
    direccion: "Calle Mayor 123",
    coches: [
      { id: 1, modelo: "Corsa", cv: 90, precio: 12000 },
      { id: 2, modelo: "Astra", cv: 110, precio: 15000 }
    ]
  }
];

// Obtener todos los concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// Crear un nuevo concesionario
app.post("/concesionarios", (req, res) => {
  const nuevo = { ...req.body, id: Date.now(), coches: [] };
  concesionarios.push(nuevo);
  res.status(201).json(nuevo);
});

// Obtener un concesionario por ID
app.get("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const encontrado = concesionarios.find((c) => c.id === id);
  if (!encontrado) return res.status(404).json({ error: "No encontrado" });
  res.json(encontrado);
});

// Actualizar un concesionario
app.put("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ error: "No encontrado" });

  concesionarios[index] = { ...concesionarios[index], ...req.body };
  res.json(concesionarios[index]);
});

// Eliminar un concesionario
app.delete("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  concesionarios = concesionarios.filter((c) => c.id !== id);
  res.json({ message: "Concesionario eliminado" });
});

// Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ error: "No encontrado" });
  res.json(concesionario.coches);
});

// Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ error: "No encontrado" });

  const nuevoCoche = { id: Date.now(), ...req.body };
  concesionario.coches.push(nuevoCoche);
  res.status(201).json(nuevoCoche);
});

// Obtener un coche por ID
app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ error: "No encontrado" });

  const coche = concesionario.coches.find((c) => c.id === cocheId);
  if (!coche) return res.status(404).json({ error: "Coche no encontrado" });

  res.json(coche);
});

// Actualizar un coche por ID
app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ error: "No encontrado" });

  const index = concesionario.coches.findIndex((c) => c.id === cocheId);
  if (index === -1) return res.status(404).json({ error: "Coche no encontrado" });

  concesionario.coches[index] = { ...concesionario.coches[index], ...req.body };
  res.json(concesionario.coches[index]);
});

// Borrar un coche por ID
app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const id = parseInt(req.params.id);
  const cocheId = parseInt(req.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario) return res.status(404).json({ error: "No encontrado" });

  concesionario.coches = concesionario.coches.filter((c) => c.id !== cocheId);
  res.json({ message: "Coche eliminado" });
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});
