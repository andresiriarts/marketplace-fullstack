import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const { favoritos } = useContext(MyContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-danger">Mis Favoritos ❤️</h2>
      
      {favoritos.length === 0 ? (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <h4>No tienes productos favoritos aún.</h4>
          <p className="text-muted">Dale corazón a los productos que te gusten para verlos aquí.</p>
          <Link to="/" className="btn btn-dark mt-3">Ir a Explorar</Link>
        </div>
      ) : (
        <div className="row">
          {favoritos.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;