import { registrarPedido, obtenerPedidosPorUsuario, obtenerDetallePedido } from '../models/pedidosModel.js';

export const crearPedido = async (req, res) => {
  try {
    const { total, carrito } = req.body;
    const usuario_id = req.usuario.id; 

    const pedido_id = await registrarPedido(usuario_id, total, carrito);
    res.status(201).json({ message: "Pedido realizado con éxito", id: pedido_id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar el pedido" });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const pedidos = await obtenerPedidosPorUsuario(usuario_id);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

export const getDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await obtenerDetallePedido(id);
    res.json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener detalle" });
  }
};