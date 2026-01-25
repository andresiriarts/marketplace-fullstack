import { createContext, useState, useEffect } from "react";

// 1. Creación del contexto
export const MyContext = createContext();

// 2. Creación del Provider
const MyContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // MEJORA 1: Inicializamos el carrito leyendo el LocalStorage (Persistencia)
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // MEJORA 1 (Parte B): Guardamos en LocalStorage cada vez que el carrito cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Consumimos el JSON simulado al cargar la página
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
    // MEJORA 3: Agregamos increment y decrement al value
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