import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoritosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/favoritos', authMiddleware, addFavorite);
router.delete('/favoritos/:id', authMiddleware, removeFavorite);
router.get('/favoritos', authMiddleware, getFavorites);

export default router;