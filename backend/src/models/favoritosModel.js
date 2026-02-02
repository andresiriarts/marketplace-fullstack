import { pool } from '../config/db.js';

// Agregar a favoritos
export const agregarFavorito = async (usuario_id, post_id) => {
  const check = await pool.query("SELECT * FROM favorites WHERE usuario_id = $1 AND post_id = $2", [usuario_id, post_id]);
  if (check.rows.length > 0) return null;

  const consulta = "INSERT INTO favorites (usuario_id, post_id) VALUES ($1, $2) RETURNING *";
  const { rows } = await pool.query(consulta, [usuario_id, post_id]);
  return rows[0];
};

export const eliminarFavorito = async (usuario_id, post_id) => {
  const consulta = "DELETE FROM favorites WHERE usuario_id = $1 AND post_id = $2 RETURNING *";
  const { rows } = await pool.query(consulta, [usuario_id, post_id]);
  return rows[0];
};

export const obtenerFavoritos = async (usuario_id) => {
  const consulta = `
    SELECT p.* FROM favorites f
    JOIN post p ON f.post_id = p.id
    WHERE f.usuario_id = $1
  `;
  const { rows } = await pool.query(consulta, [usuario_id]);
  return rows;
};