import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import Card from "../components/Card";

const Home = () => {
  const { productos } = useContext(MyContext);

  // Seleccionamos los 3 primeros productos para el Carrusel
  const destacados = productos.slice(0, 3);

  return (
    <div className="container mt-4">
      
      {/* === CARRUSEL DE DESTACADOS === */}
      {destacados.length > 0 && (
        <header className="mb-5 shadow rounded overflow-hidden">
          <div id="carruselDestacados" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {destacados.map((_, index) => (
                <button 
                  key={index} 
                  type="button" 
                  data-bs-target="#carruselDestacados" 
                  data-bs-slide-to={index} 
                  className={index === 0 ? "active" : ""}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {destacados.map((p, index) => (
                <div key={p.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <div style={{ position: "relative", height: "400px", backgroundColor: "#333" }}>
                    <img 
                      src={p.img} 
                      className="d-block w-100 h-100" 
                      alt={p.titulo} 
                      style={{ objectFit: "contain", opacity: 0.8 }} 
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                      <h2 className="fw-bold">{p.titulo}</h2>
                      <p>{p.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carruselDestacados" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carruselDestacados" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </header>
      )}

      {/* === CATÁLOGO COMPLETO === */}
      <h2 className="text-center mb-4 border-bottom pb-2">Nuestros Productos 🛍️</h2>
      <div className="row">
        {productos.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Home;