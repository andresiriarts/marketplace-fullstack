import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import Card from "../components/Card"; // <--- Importamos el componente nuevo

const Home = () => {
  const { productos } = useContext(MyContext);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Galería de Productos</h1>
      <div className="row">
        {productos.map((producto) => (
          // Usamos el componente Card y le pasamos el producto como "prop"
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Home;