const express = require("express");
const connectDB = require("./database"); // Asegúrate de que existe y conecta correctamente
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); // El archivo swagger.json debe estar en la raíz del proyecto

const app = express();
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 8080;

// Conectar a la base de datos
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor desplegado en puerto: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// --- Datos simulados (en memoria) ---
let concesionarios = [
  {
    id: 1,
    nombre: "AutoMadrid",
    direccion: "Calle Mayor 123",
    coches: [
      { id: 1, modelo: "Corsa", cv: 90, precio: 12000 },
      { id: 2, modelo: "Astra", cv: 110, precio: 15000 },
    ],
  },
];

// =========================
// RUTAS DE CONCESIONARIOS
// =========================

// Obtener todos los concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// Crear nuevo concesionario
app.post("/concesionarios", (req, res) => {
  const nuevo = { ...req.body, id: Date.now(), coches: [] };
  concesionarios.push(nuevo);
  res.status(201).json(nuevo);
});

// Obtener un concesionario por ID
app.get("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });
  res.json(concesionario);
});

// Actualizar un concesionario
app.put("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  concesionarios[index] = { ...concesionarios[index], ...req.body };
  res.json(concesionarios[index]);
});

// Eliminar un concesionario
app.delete("/concesionarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  concesionarios = concesionarios.filter((c) => c.id !== id);
  res.json({ message: "Concesionario eliminado" });
});

// =========================
// RUTAS DE COCHES POR CONCESIONARIO
// =========================

// Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", (req, res) => {
  const concesionario = concesionarios.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  res.json(concesionario.coches);
});

// Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", (req, res) => {
  const concesionario = concesionarios.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  const nuevoCoche = { id: Date.now(), ...req.body };
  concesionario.coches.push(nuevoCoche);
  res.status(201).json(nuevoCoche);
});

// Obtener un coche específico de un concesionario
app.get("/concesionarios/:id/coches/:id_coche", (req, res) => {
  const concesionario = concesionarios.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  const coche = concesionario.coches.find(
    (car) => car.id === parseInt(req.params.id_coche)
  );
  if (!coche) return res.status(404).json({ error: "Coche no encontrado" });

  res.json(coche);
});

// Actualizar un coche específico de un concesionario
app.put("/concesionarios/:id/coches/:id_coche", (req, res) => {
  const concesionario = concesionarios.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  const cocheIndex = concesionario.coches.findIndex(
    (car) => car.id === parseInt(req.params.id_coche)
  );
  if (cocheIndex === -1)
    return res.status(404).json({ error: "Coche no encontrado" });

  concesionario.coches[cocheIndex] = {
    ...concesionario.coches[cocheIndex],
    ...req.body,
  };
  res.json(concesionario.coches[cocheIndex]);
});

// Eliminar un coche específico de un concesionario
app.delete("/concesionarios/:id/coches/:id_coche", (req, res) => {
  const concesionario = concesionarios.find(
    (c) => c.id === parseInt(req.params.id)
  );
  if (!concesionario)
    return res.status(404).json({ error: "Concesionario no encontrado" });

  concesionario.coches = concesionario.coches.filter(
    (car) => car.id !== parseInt(req.params.id_coche)
  );
  res.json({ message: "Coche eliminado" });
});
