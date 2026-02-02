import { Router } from 'express';
import { crearPedido, getPedidos, getDetalle } from '../controllers/pedidosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/pedidos', authMiddleware, crearPedido);
router.get('/pedidos', authMiddleware, getPedidos);

router.get('/pedidos/:id', authMiddleware, getDetalle);

export default router;