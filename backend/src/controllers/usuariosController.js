import { registrarUsuario, obtenerUsuarioPorEmail } from '../models/usuariosModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    await registrarUsuario({ nombre, email, password, rol });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const passwordEsCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!passwordEsCorrecta) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    // Crear Token
    const token = jwt.sign(
      { email: usuario.email, rol: usuario.rol, id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const obtenerDatosUsuario = async (req, res) => {
  try {
    const { email } = req.usuario;
    const usuario = await obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      created_at: usuario.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};