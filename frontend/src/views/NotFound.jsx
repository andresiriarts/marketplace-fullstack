import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <h3 className="mb-4">¡Ups! Página no encontrada</h3>
      <p className="lead">La ruta que intentas consultar no existe.</p>
      <Link to="/" className="btn btn-primary btn-lg mt-3">Volver al Home</Link>
    </div>
  );
};

export default NotFound;