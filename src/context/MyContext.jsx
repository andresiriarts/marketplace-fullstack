import { createContext, useState, useEffect } from "react";

// 1. Creación del contexto
export const MyContext = createContext();

// 2. Creación del Provider (el componente que envuelve a la app)
const MyContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Consumimos el JSON simulado al cargar la página
  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = async () => {
    const res = await fetch("/productos.json");
    const data = await res.json();
    setProductos(data);
  };

  // Función para agregar al carrito (La usaremos más adelante)
  const addToCart = (product) => {
    // Buscamos si el producto ya está en el carrito
    const index = carrito.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      // Si existe, creamos una copia y sumamos 1 a la cantidad
      const newCarrito = [...carrito];
      newCarrito[index].count++;
      setCarrito(newCarrito);
    } else {
      // Si no existe, lo agregamos con count: 1
      const newProducto = { ...product, count: 1 };
      setCarrito([...carrito, newProducto]);
    }
  };

  return (
    <MyContext.Provider value={{ productos, setProductos, carrito, setCarrito, addToCart }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;