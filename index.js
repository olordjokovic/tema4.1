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

// Rutas de concesionarios y coches (tu código existente)


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



// RUTAS DE GREIDLAS

let greidlas=[];


//Obtener todas las greidlas

app.get("/greidslas", (req, res) => {
  res.json(greidslas);
});


// Crear nueva greidsla

app.post("/greidslas", (req, res) => {
  const nuevaGreidsla = { ...req.body, id: Date.now(), puckets: [] };
  greidslas.push(nuevaGreidsla);
  res.status(201).json(nuevaGreidsla);
});


// Obtener una greidsla por ID

app.get("/greidslas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const greidsla = greidslas.find(g => g.id === id);
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });
  res.json(greidsla);
});

// Actualizar una greidsla
app.put("/greidslas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = greidslas.findIndex(g => g.id === id);
  if (index === -1) return res.status(404).json({ error: "Greidsla no encontrada" });

  greidslas[index] = { ...greidslas[index], ...req.body };
  res.json(greidslas[index]);
});


// Eliminar una greidsla
app.delete("/greidslas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  greidslas = greidslas.filter(g => g.id !== id);
  res.json({ message: "Greidsla eliminada" });
});



//Rutas de puckets dentro de greidslas


// Obtener todos los puckets de una greidsla
app.get("/greidslas/:id/puckets", (req, res) => {
  const greidsla = greidslas.find(g => g.id === parseInt(req.params.id));
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });

  res.json(greidsla.puckets);
});


// Crear un nuevo pucket
app.post("/greidslas/:id/puckets", (req, res) => {
  const greidsla = greidslas.find(g => g.id === parseInt(req.params.id));
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });

  const nuevoPucket = { id: Date.now(), ...req.body };
  greidsla.puckets.push(nuevoPucket);
  res.status(201).json(nuevoPucket);
});


// Obtener un pucket específico
app.get("/greidslas/:id/puckets/:pucketId", (req, res) => {
  const greidsla = greidslas.find(g => g.id === parseInt(req.params.id));
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });

  const pucket = greidsla.puckets.find(p => p.id === parseInt(req.params.pucketId));
  if (!pucket) return res.status(404).json({ error: "Pucket no encontrado" });

  res.json(pucket);
});

// Actualizar un pucket
app.put("/greidslas/:id/puckets/:pucketId", (req, res) => {
  const greidsla = greidslas.find(g => g.id === parseInt(req.params.id));
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });

  const index = greidsla.puckets.findIndex(p => p.id === parseInt(req.params.pucketId));
  if (index === -1) return res.status(404).json({ error: "Pucket no encontrado" });

  greidsla.puckets[index] = { ...greidsla.puckets[index], ...req.body };
  res.json(greidsla.puckets[index]);
});

// Eliminar un pucket
app.delete("/greidslas/:id/puckets/:pucketId", (req, res) => {
  const greidsla = greidslas.find(g => g.id === parseInt(req.params.id));
  if (!greidsla) return res.status(404).json({ error: "Greidsla no encontrada" });

  greidsla.puckets = greidsla.puckets.filter(p => p.id !== parseInt(req.params.pucketId));
  res.json({ message: "Pucket eliminado" });
});











