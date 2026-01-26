import { Router } from 'express';
import { crearUsuario, loginUsuario, obtenerDatosUsuario } from '../controllers/usuariosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 

const router = Router();

// Rutas Públicas
router.post('/usuarios', crearUsuario);
router.post('/login', loginUsuario);

// Rutas Privadas
router.get('/usuarios', authMiddleware, obtenerDatosUsuario);

export default router;