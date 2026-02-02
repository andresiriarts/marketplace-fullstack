import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Detalle = () => {
  const { id } = useParams();
  const { productos, addToCart } = useContext(MyContext);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productoEncontrado = productos.find((p) => p.id === Number(id));
    setProducto(productoEncontrado);
  }, [id, productos]);

  if (!producto) {
    return <div className="text-center mt-5">Cargando producto... ⏳</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow mb-3">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={producto.img}
              className="img-fluid rounded-start h-100"
              alt={producto.titulo}
              style={{ objectFit: "cover", minHeight: "300px" }}
            />
          </div>
          
          {/* Columna Detalles */}
          <div className="col-md-7">
            <div className="card-body d-flex flex-column h-100">
              <h2 className="card-title text-capitalize">{producto.titulo}</h2>
              <hr />
              <p className="card-text text-muted">{producto.descripcion}</p>
              
              <div className="mt-auto">
                <h4 className="fw-bold mb-3">
                  Precio: ${producto.precio.toLocaleString("es-CL")}
                </h4>
                
                <p className={`fw-bold ${producto.stock > 0 ? "text-success" : "text-danger"}`}>
                  {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : "Sin Stock"}
                </p>

                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-dark flex-grow-1"
                    onClick={() => addToCart(producto)}
                    disabled={producto.stock === 0}
                  >
                    {producto.stock > 0 ? "🛒 Añadir al Carrito" : "Agotado"}
                  </button>
                  <a href="/" className="btn btn-outline-secondary">
                    Volver
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;