import express from "express";
import type { NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";

const app = express();
const PORT = 3002;

// 1. Inicializar Base de Datos
connectDB();

// 2. Middlewares
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleTimeString();

  console.log(`[${time}] Petición ${method} recibida en la ruta: ${url}`);

  next();
};

app.use(requestLogger);
app.use(express.json());

// 3. Registrar Rutas
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchaseRoutes);

// 4. Manejo de Errores (404)
app.use((req: Request, res: Response) => {
  res.status(404).send("Error 404: Ruta no encontrada.");
});

// 5. Arrancar Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});
