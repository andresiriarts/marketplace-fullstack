import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Navbar = () => {
  const { token, logout, total } = useContext(MyContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🛒 Market FullStack</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">🔒 Perfil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favoritos">❤️ Favoritos</Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="nav-link btn btn-link text-danger" style={{ textDecoration: "none" }}>
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrarse">Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link text-info" to="/carrito">
                🛒 Total: ${total.toLocaleString("es-CL")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;