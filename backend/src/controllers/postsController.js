import { obtenerPosts, agregarPost, actualizarPost, borrarPost } from '../models/postsModel.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los posts' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { titulo, descripcion, precio, stock, img } = req.body;
    const usuario_id = req.usuario.id;

    if (!titulo || !precio || !stock || !img) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const nuevoPost = await agregarPost({ titulo, descripcion, precio, stock, img, usuario_id });
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;
    const { titulo, descripcion, precio, stock, img } = req.body;

    const postActualizado = await actualizarPost(id, { titulo, descripcion, precio, stock, img }, usuario_id);

    if (!postActualizado) {
      return res.status(404).json({ message: "No se encontró el post o no tienes permisos" });
    }

    res.json(postActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    const postEliminado = await borrarPost(id, usuario_id);

    if (!postEliminado) {
      return res.status(404).json({ message: "No se encontró el post o no tienes permisos" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
};