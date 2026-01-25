import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Card = ({ producto }) => {
  const { addToCart } = useContext(MyContext);

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={producto.img} className="card-img-top" alt={producto.titulo} />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{producto.titulo}</h5>
          <p className="card-text fw-bold">Precio: ${producto.precio.toLocaleString()}</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm">Ver Más</button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => addToCart(producto)}
            >
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;