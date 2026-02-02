import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Editar = () => {
  const { id } = useParams();
  const { productos, editarPost, user } = useContext(MyContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    titulo: "", descripcion: "", precio: "", stock: "", img: ""
  });

  useEffect(() => {
    const productoEncontrado = productos.find((p) => p.id === Number(id));
    if (productoEncontrado) {
      if (user && productoEncontrado.usuario_id !== user.id) {
        alert("No tienes permisos ⛔");
        navigate("/mis-publicaciones");
      } else {
        setPost(productoEncontrado);
      }
    }
  }, [id, productos, user, navigate]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editarPost(Number(id), post);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Producto ✏️</h2>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Título</label>
            <input name="titulo" value={post.titulo} className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Descripción</label>
            <textarea name="descripcion" value={post.descripcion} className="form-control" onChange={handleChange} />
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label>Precio</label>
              <input type="number" name="precio" value={post.precio} className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-6 mb-3">
              <label>Stock</label>
              <input type="number" name="stock" value={post.stock} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label>Imagen URL</label>
            <input name="img" value={post.img} className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Editar;