import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Carrito from "./views/Carrito";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App