import { pool } from '../config/db.js';

// Obtener todos los posts (Home)
export const obtenerPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
};

// Crear un post (Admin)
export const agregarPost = async ({ titulo, descripcion, precio, stock, img, usuario_id }) => {
  const consulta = `
    INSERT INTO posts (titulo, descripcion, precio, stock, img, usuario_id) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;
  const valores = [titulo, descripcion, precio, stock, img, usuario_id];
  const { rows } = await pool.query(consulta, valores);
  return rows[0];
};

// Modificar un post (Solo el dueño)
export const actualizarPost = async (id, { titulo, descripcion, precio, stock, img }, usuario_id) => {
  const consulta = `
    UPDATE posts
    SET titulo = $1, descripcion = $2, precio = $3, stock = $4, img = $5
    WHERE id = $6 AND usuario_id = $7
    RETURNING *
  `;
  const valores = [titulo, descripcion, precio, stock, img, id, usuario_id];
  const { rows } = await pool.query(consulta, valores);
  return rows[0];
};

// Eliminar un post (Solo el dueño)
export const borrarPost = async (id, usuario_id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 AND usuario_id = $2 RETURNING *";
  const valores = [id, usuario_id];
  const { rows } = await pool.query(consulta, valores);
  return rows[0];
};