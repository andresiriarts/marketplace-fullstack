import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from '../models/favoritosModel.js';

export const addFavorite = async (req, res) => {
  try {
    const { post_id } = req.body; // Recibimos el ID del producto
    const usuario_id = req.usuario.id; // Del token
    
    await agregarFavorito(usuario_id, post_id);
    res.status(201).json({ message: "Agregado a favoritos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar favorito" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params; // ID del producto a eliminar
    const usuario_id = req.usuario.id;
    
    await eliminarFavorito(usuario_id, id);
    res.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const favoritos = await obtenerFavoritos(usuario_id);
    res.json(favoritos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
};