import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './src/config/db.js';
import usuariosRoutes from './src/routes/usuariosRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(cors());

// Usar las rutas
app.use(usuariosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor encendido en http://localhost:${PORT}`);
});

export default app; // Exportamos para Testing