import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";

const MisPublicaciones = () => {
  const { productos, user, eliminarPost } = useContext(MyContext);

  const misPosts = productos.filter((p) => p.usuario_id === user?.id);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Inventario 📦</h2>
      
      {misPosts.length === 0 ? (
        <div className="alert alert-secondary text-center">
          <h4>No tienes productos publicados.</h4>
          <Link to="/admin" className="btn btn-dark mt-2">Crear Producto</Link>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Foto</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {misPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img src={post.img} alt={post.titulo} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                  </td>
                  <td className="fw-bold">{post.titulo}</td>
                  <td>${post.precio.toLocaleString("es-CL")}</td>
                  <td>{post.stock}</td>
                  <td className="text-end">
                    <Link to={`/editar/${post.id}`} className="btn btn-warning btn-sm me-2">✏️ Editar</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarPost(post.id)}>🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 text-center">
        <Link to="/perfil" className="btn btn-outline-secondary">Volver al Perfil</Link>
      </div>
    </div>
  );
};

export default MisPublicaciones;