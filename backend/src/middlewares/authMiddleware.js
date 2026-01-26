import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};