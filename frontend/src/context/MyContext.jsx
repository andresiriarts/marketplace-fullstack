import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = async () => {
    const res = await fetch("/productos.json");
    const data = await res.json();
    setProductos(data);
  };

  const addToCart = (product) => {
    const index = carrito.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      const newCarrito = [...carrito];
      newCarrito[index].count++;
      setCarrito(newCarrito);
    } else {
      const newProducto = { ...product, count: 1 };
      setCarrito([...carrito, newProducto]);
    }
  };

  // MEJORA 2: Función para incrementar (+)
  const increment = (id) => {
    const newCarrito = carrito.map((item) => {
      if (item.id === id) return { ...item, count: item.count + 1 };
      return item;
    });
    setCarrito(newCarrito);
  };

  // MEJORA 2: Función para decrementar (-)
  const decrement = (id) => {
    const newCarrito = carrito
      .map((item) => {
        if (item.id === id) return { ...item, count: item.count - 1 };
        return item;
      })
      .filter((item) => item.count > 0); // Elimina si llega a 0
    setCarrito(newCarrito);
  };

  return (
    <MyContext.Provider
      value={{
        productos,
        setProductos,
        carrito,
        setCarrito,
        addToCart,
        increment,
        decrement,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;