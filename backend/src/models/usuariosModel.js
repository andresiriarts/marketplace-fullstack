import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const registrarUsuario = async ({ nombre, email, password, rol }) => {
  // 1. Encriptar contraseña
  const passwordEncriptada = bcrypt.hashSync(password, 10);

  // 2. Insertar en BD
  const consulta = 'INSERT INTO users (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [nombre, email, passwordEncriptada, rol];

  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

export const obtenerUsuarioPorEmail = async (email) => {
  const consulta = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(consulta, [email]);
  return rows[0];
};