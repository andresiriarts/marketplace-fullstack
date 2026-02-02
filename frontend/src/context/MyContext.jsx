import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // --- 1. ESTADOS GLOBALES ---
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [favoritos, setFavoritos] = useState([]); // ❤️ Estado para Favoritos
  
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculamos el total del carrito dinámicamente
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.count), 0);

  // --- 2. EFECTOS (Ciclo de Vida) ---
  
  // Persistir carrito en LocalStorage
  useEffect(() => { 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
  }, [carrito]);

  // Cargar productos al iniciar la app
  useEffect(() => { 
    getDatos(); 
  }, []);

  // Si hay token, cargamos perfil, pedidos y favoritos
  useEffect(() => {
    if (token) {
      getUserProfile();
      getPedidos();
      getFavoritos(); // <--- Cargar favoritos al loguearse
    }
  }, [token]);


  // --- 3. FUNCIONES: PRODUCTOS (Público) ---
  const getDatos = async () => {
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/posts");
      const data = await res.json();
      // Validación para evitar que la app explote si el server falla
      if (Array.isArray(data)) setProductos(data);
      else setProductos([]);
    } catch (error) {
      console.error("Error cargando posts:", error);
      setProductos([]);
    }
  };

  // --- 4. FUNCIONES: FAVORITOS ❤️ (Privado) ---
  const getFavoritos = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/favoritos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setFavoritos(data);
    } catch (error) {
      console.error("Error obteniendo favoritos:", error);
    }
  };

  const addFavorito = async (producto) => {
    if (!token) return alert("Inicia sesión para agregar a favoritos ❤️");
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/favoritos", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ post_id: producto.id }) 
      });

      if (res.ok) {
        setFavoritos([...favoritos, producto]); 
      }
    } catch (error) {
      console.error("Error agregando favorito:", error);
    }
  };

  const removeFavorito = async (id) => {
    try {
      const res = await fetch(`https://marketplace-fullstack.onrender.com/favoritos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setFavoritos(favoritos.filter(f => f.id !== id)); 
      }
    } catch (error) {
      console.error("Error eliminando favorito:", error);
    }
  };

  // --- 5. FUNCIONES: CARRITO Y PEDIDOS 🛒 ---
  const addToCart = (p) => {
    const index = carrito.findIndex(x => x.id === p.id);
    if (index >= 0) { 
      const newCart = [...carrito]; 
      newCart[index].count++; 
      setCarrito(newCart); 
    } else { 
      setCarrito([...carrito, { ...p, count: 1 }]); 
    }
  };

  const increment = (id) => setCarrito(carrito.map(x => x.id === id ? { ...x, count: x.count + 1 } : x));
  
  const decrement = (id) => setCarrito(
    carrito.map(x => x.id === id ? { ...x, count: x.count - 1 } : x)
           .filter(x => x.count > 0)
  );
  
  const removeProduct = (id) => setCarrito(carrito.filter(x => x.id !== id));

  // Obtener historial de pedidos
  const getPedidos = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/pedidos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPedidos(data);
    } catch (error) { console.error(error); }
  };

  // Pagar y guardar en BD
  const pagarCompra = async () => {
    if (!token) {
      alert("⚠️ Inicia sesión para finalizar");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("https://marketplace-fullstack.onrender.com/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carrito, total }),
      });

      if (response.ok) {
        alert("¡Compra realizada con éxito! 🎉");
        setCarrito([]);
        getPedidos();
        navigate("/perfil");
      } else {
        alert("Error al procesar el pago");
      }
    } catch (error) { console.error(error); }
  };

  // --- 6. FUNCIONES: ADMIN (CRUD) ⚙️ ---
  const crearPost = async (nuevoPost) => {
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(nuevoPost),
      });
      if (res.ok) { 
        alert("Producto creado 🎉"); 
        getDatos(); 
        navigate("/"); 
      }
    } catch (e) { console.error(e); }
  };

  const editarPost = async (id, postEditado) => {
    try {
      const res = await fetch(`https://marketplace-fullstack.onrender.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(postEditado),
      });
      if (res.ok) {
        alert("Actualizado ✅");
        const data = await res.json();
        setProductos(productos.map(p => p.id === id ? data : p));
        navigate("/mis-publicaciones");
      }
    } catch (e) { console.error(e); }
  };

  const eliminarPost = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminarlo?")) return;
    try {
      const res = await fetch(`https://marketplace-fullstack.onrender.com/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProductos(productos.filter(p => p.id !== id));
        alert("Eliminado 🗑️");
      }
    } catch (e) { console.error(e); }
  };

  // --- 7. FUNCIONES: AUTH 🔐 ---
  const getUserProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/usuarios", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      if (res.ok) setUser(data); 
      else logout();
    } catch (e) { console.error(e); }
  };

  const registerUser = async (u) => {
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/usuarios", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u)
      });
      if (res.ok) { alert("Registrado con éxito"); navigate("/login"); } 
      else alert("Error al registrar");
    } catch (e) { console.error(e); }
  };

  const loginUser = async (u) => {
    try {
      const res = await fetch("https://marketplace-fullstack.onrender.com/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/perfil");
      } else alert(data.message);
    } catch (e) { console.error(e); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setPedidos([]);
    setFavoritos([]);
    navigate("/");
  };

  return (
    <MyContext.Provider value={{
      // Estados
      token, user, productos, carrito, total, pedidos, favoritos,
      
      // Auth
      registerUser, loginUser, logout,
      
      // Carrito
      addToCart, increment, decrement, removeProduct, pagarCompra,
      
      // Admin
      crearPost, editarPost, eliminarPost,

      // Favoritos
      addFavorito, removeFavorito
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;