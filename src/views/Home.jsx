import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Home = () => {
  const { productos } = useContext(MyContext);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Galería de Productos</h1>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={producto.img} className="card-img-top" alt={producto.titulo} />
              <div className="card-body">
                <h5 className="card-title">{producto.titulo}</h5>
                <p className="card-text">Price: ${producto.precio.toLocaleString()}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm">Ver Más</button>
                  <button className="btn btn-danger btn-sm">Añadir 🛒</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;