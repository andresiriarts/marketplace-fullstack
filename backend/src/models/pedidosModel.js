import { pool } from '../config/db.js';

// 1. Guardar un nuevo pedido (Transacción con carrito)
export const registrarPedido = async (usuario_id, total, carrito) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const consultaPedido = "INSERT INTO pedidos (usuario_id, total) VALUES ($1, $2) RETURNING id";
    const resPedido = await client.query(consultaPedido, [usuario_id, total]);
    const pedido_id = resPedido.rows[0].id;

    const consultaDetalle = "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)";
    
    for (const producto of carrito) {
      await client.query(consultaDetalle, [pedido_id, producto.id, producto.count, producto.precio]);
    }

    await client.query('COMMIT');
    return pedido_id;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// 2. Obtener pedidos de un usuario (Historial)
export const obtenerPedidosPorUsuario = async (usuario_id) => {
  const consulta = "SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY created_at DESC";
  const { rows } = await pool.query(consulta, [usuario_id]);
  return rows;
};

// 3. Obtener el detalle de productos de un pedido
export const obtenerDetallePedido = async (pedido_id) => {
  const consulta = `
    SELECT dp.cantidad, dp.precio, p.titulo, p.img
    FROM detalle_pedidos dp
    JOIN posts p ON dp.producto_id = p.id
    WHERE dp.pedido_id = $1
  `;
  const { rows } = await pool.query(consulta, [pedido_id]);
  return rows;
};