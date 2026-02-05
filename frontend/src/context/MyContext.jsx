import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importamos las alertas

export const MyContext = createContext();

// 🌍 URL DEL BACKEND (Render)
const API_URL = "https://marketplace-fullstack.onrender.com";

const MyContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // --- CONFIGURACIÓN DEL TOAST (Notificación pequeña en la esquina) ---
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  // --- 1. ESTADOS GLOBALES ---
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.count), 0);

  // --- 2. EFECTOS ---
  useEffect(() => { localStorage.setItem("carrito", JSON.stringify(carrito)); }, [carrito]);
  useEffect(() => { getDatos(); }, []);
  useEffect(() => { 
    if (token) { 
      getUserProfile(); 
      getPedidos(); 
      getFavoritos(); 
    } 
  }, [token]);

  // --- 3. FUNCIONES: PRODUCTOS ---
  const getDatos = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      if (Array.isArray(data)) setProductos(data);
    } catch (error) { console.error("Error cargando posts:", error); }
  };

  // --- 4. FUNCIONES: FAVORITOS ❤️ ---
  const getFavoritos = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/favoritos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setFavoritos(data);
    } catch (error) { console.error(error); }
  };

  const addFavorito = async (producto) => {
    if (!token) return Swal.fire("¡Atención!", "Inicia sesión para agregar a favoritos ❤️", "warning");
    try {
      const res = await fetch(`${API_URL}/favoritos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ post_id: producto.id }) 
      });

      if (res.ok) {
        setFavoritos([...favoritos, producto]); 
        // ALERTA TOAST
        Toast.fire({ icon: "success", title: "Agregado a favoritos ❤️" });
      } else {
        // Si ya existe (status 409 u otro), avisamos o no hacemos nada
        const data = await res.json();
        Toast.fire({ icon: "info", title: data.message });
      }
    } catch (error) { console.error(error); }
  };

  const removeFavorito = async (id) => {
    try {
      const res = await fetch(`${API_URL}/favoritos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setFavoritos(favoritos.filter(f => f.id !== id)); 
        Toast.fire({ icon: "success", title: "Eliminado de favoritos 💔" });
      }
    } catch (error) { console.error(error); }
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
    // ALERTA TOAST
    Toast.fire({ icon: "success", title: "Producto agregado 🛒" });
  };

  const increment = (id) => setCarrito(carrito.map(x => x.id === id ? { ...x, count: x.count + 1 } : x));
  const decrement = (id) => setCarrito(carrito.map(x => x.id === id ? { ...x, count: x.count - 1 } : x).filter(x => x.count > 0));
  const removeProduct = (id) => setCarrito(carrito.filter(x => x.id !== id));

  const getPedidos = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/pedidos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPedidos(data);
    } catch (error) { console.error(error); }
  };

  const pagarCompra = async () => {
    if (!token) {
      Swal.fire("Inicia Sesión", "Debes estar logueado para pagar", "info");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carrito, total }),
      });

      if (response.ok) {
        setCarrito([]); 
        getPedidos();   
        
        // ALERTA MODAL DE ÉXITO
        Swal.fire({
          title: "¡Compra Exitosa!",
          text: "Tu pedido ha sido procesado correctamente 📦",
          icon: "success",
          confirmButtonText: "Ver mis pedidos"
        }).then(() => {
          navigate("/perfil");
        });
      } else {
        Swal.fire("Error", "No se pudo procesar el pago", "error");
      }
    } catch (error) { console.error(error); }
  };

  // --- 6. FUNCIONES: ADMIN (CRUD) ⚙️ ---
  const crearPost = async (nuevoPost) => {
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(nuevoPost),
      });
      if (res.ok) { 
        Swal.fire("Creado", "Producto publicado con éxito", "success");
        getDatos(); 
        navigate("/"); 
      }
    } catch (e) { console.error(e); }
  };

  const editarPost = async (id, postEditado) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(postEditado),
      });
      if (res.ok) {
        Swal.fire("Actualizado", "Producto editado correctamente", "success");
        const data = await res.json();
        setProductos(productos.map(p => p.id === id ? data : p));
        navigate("/mis-publicaciones");
      }
    } catch (e) { console.error(e); }
  };

  const eliminarPost = async (id) => {
    // Confirmación con SweetAlert
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/posts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setProductos(productos.filter(p => p.id !== id));
          Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        }
      } catch (e) { console.error(e); }
    }
  };

  // --- 7. FUNCIONES: AUTH 🔐 ---
  const getUserProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/usuarios`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      if (res.ok) setUser(data); 
      else logout();
    } catch (e) { console.error(e); }
  };

  const registerUser = async (u) => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u)
      });
      if (res.ok) { 
        Swal.fire("¡Bienvenido!", "Usuario registrado con éxito", "success");
        navigate("/login"); 
      } else {
        const errorData = await res.json();
        Swal.fire("Error", errorData.message || "Error al registrar", "error");
      }
    } catch (e) { console.error(e); }
  };

  const loginUser = async (u) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        Toast.fire({ icon: "success", title: "¡Bienvenido de nuevo!" });
        navigate("/perfil");
      } else {
        Swal.fire("Error", data.message || "Credenciales incorrectas", "error");
      }
    } catch (e) { console.error(e); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setPedidos([]);
    setFavoritos([]);
    Toast.fire({ icon: "info", title: "Has cerrado sesión" });
    navigate("/");
  };

  return (
    <MyContext.Provider value={{
      token, user, productos, carrito, total, pedidos, favoritos,
      registerUser, loginUser, logout,
      addToCart, increment, decrement, removeProduct, pagarCompra,
      crearPost, editarPost, eliminarPost,
      addFavorito, removeFavorito
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;