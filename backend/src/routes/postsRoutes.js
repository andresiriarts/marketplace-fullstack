import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas Públicas
router.get('/posts', getPosts);

// Rutas Privadas
router.post('/posts', authMiddleware, createPost);
router.put('/posts/:id', authMiddleware, updatePost);    // Editar
router.delete('/posts/:id', authMiddleware, deletePost); // Eliminar

export default router;