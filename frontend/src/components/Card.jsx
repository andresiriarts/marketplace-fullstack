import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const Card = ({ producto }) => {
  const { addToCart, addFavorito, removeFavorito, favoritos, user } = useContext(MyContext);
  const navigate = useNavigate();

  const isFavorite = favoritos.some((fav) => fav.id === producto.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorito(producto.id);
    } else {
      addFavorito(producto);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm position-relative">
        <button 
          className="btn position-absolute top-0 end-0 m-2 border-0 shadow-sm" 
          style={{ 
            color: isFavorite ? "red" : "gray", 
            backgroundColor: "white", 
            borderRadius: "50%", 
            width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"
          }}
          onClick={handleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <img src={producto.img} className="card-img-top" alt={producto.titulo} style={{ height: "200px", objectFit: "cover" }} />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-capitalize">{producto.titulo}</h5>
          <p className="card-text fw-bold text-primary">${producto.precio.toLocaleString("es-CL")}</p>
          
          <div className="d-flex justify-content-between mt-auto gap-2">
            <button className="btn btn-outline-primary btn-sm flex-grow-1" onClick={() => navigate(`/producto/${producto.id}`)}>
              Ver Más
            </button>
            <button className="btn btn-danger btn-sm flex-grow-1" onClick={() => addToCart(producto)}>
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;