import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Carrito = () => {
  const { carrito, increment, decrement } = useContext(MyContext);
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.count), 0);

  return (
    <div className="container mt-5">
      <div className="p-5 bg-light border rounded-3">
        <h3 className="mb-4">Detalles del pedido:</h3>

        {carrito.length === 0 ? (
          <div className="alert alert-warning text-center">
            Tu carrito está vacío 😔
          </div>
        ) : (
          <div className="bg-white p-3 rounded shadow-sm">
            {carrito.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <div className="d-flex align-items-center">
                  <img src={item.img} alt={item.titulo} width="50" className="me-3 rounded" />
                  <span className="text-capitalize fw-bold">{item.titulo}</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="text-success fw-bold me-3">
                    ${(item.precio * item.count).toLocaleString()}
                  </span>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => decrement(item.id)}>-</button>
                  <span className="fw-bold mx-2">{item.count}</span>
                  <button className="btn btn-primary btn-sm ms-2" onClick={() => increment(item.id)}>+</button>
                </div>
              </div>
            ))}
            <h2 className="mt-4 text-end">Total: ${total.toLocaleString()}</h2>
            <div className="text-end">
              <button className="btn btn-success mt-3 fw-bold">Ir a Pagar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;