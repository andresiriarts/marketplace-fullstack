import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Carrito = () => {
  const { carrito, increment, decrement, removeProduct, total, pagarCompra } = useContext(MyContext);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Detalle del Pedido</h2>
        
        {carrito.length === 0 ? (
          <div className="text-center py-5">
            <h4>El carrito está vacío 🛒</h4>
            <p className="text-muted">Agrega productos para comenzar.</p>
          </div>
        ) : (
          <>
            <ul className="list-group list-group-flush">
              {carrito.map((producto, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center gap-3">
                    <img src={producto.img} alt={producto.titulo} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                    <div>
                      <h6 className="mb-0 text-capitalize">{producto.titulo}</h6>
                      <small className="text-muted">${producto.precio.toLocaleString("es-CL")}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => decrement(producto.id)}>-</button>
                    <span className="fw-bold mx-2">{producto.count}</span>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => increment(producto.id)}>+</button>
                    <button className="btn btn-danger btn-sm ms-3" onClick={() => removeProduct(producto.id)}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-top pt-3">
              <h3 className="text-end mb-4">Total: ${total.toLocaleString("es-CL")}</h3>
              <div className="d-grid gap-2 col-md-6 mx-auto">
                <button className="btn btn-dark btn-lg" onClick={pagarCompra}>
                  Ir a Pagar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;