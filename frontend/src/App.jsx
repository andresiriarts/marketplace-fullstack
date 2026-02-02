import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Vistas
import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Carrito from "./views/Carrito";
import NotFound from "./views/NotFound";
import Detalle from "./views/Detalle";
import Admin from "./views/Admin";
import MisPublicaciones from "./views/MisPublicaciones";
import Editar from "./views/Editar";
import Favoritos from "./views/Favoritos";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/producto/:id" element={<Detalle />} />
        
        {/* Rutas Protegidas */}
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/mis-publicaciones" element={<PrivateRoute><MisPublicaciones /></PrivateRoute>} />
        <Route path="/editar/:id" element={<PrivateRoute><Editar /></PrivateRoute>} />
        <Route path="/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;