import { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";

const Admin = () => {
  const { crearPost } = useContext(MyContext);

  const [post, setPost] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    img: ""
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones simples
    if (!post.titulo || !post.precio || !post.stock || !post.img) {
      return alert("Por favor, completa los campos obligatorios ⚠️");
    }
    // Enviamos al Contexto
    crearPost(post);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Creación</h2>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-3">➕ Nuevo Producto</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input 
              name="titulo" 
              className="form-control" 
              placeholder="Ej: Monitor 24 pulgadas"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea 
              name="descripcion" 
              className="form-control" 
              placeholder="Detalles del producto..."
              onChange={handleChange} 
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Precio ($)</label>
              <input 
                type="number" 
                name="precio" 
                className="form-control" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>
              <input 
                type="number" 
                name="stock" 
                className="form-control" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">URL de Imagen</label>
            <input 
              type="text" 
              name="img" 
              className="form-control" 
              placeholder="https://..." 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-warning fw-bold w-100">
            Publicar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;