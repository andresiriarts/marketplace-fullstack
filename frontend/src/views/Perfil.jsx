import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { user, logout, productos, pedidos, token } = useContext(MyContext);
  
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [pedidoId, setPedidoId] = useState(null);

  const misPublicacionesCount = productos.filter((p) => p.usuario_id === user?.id).length;

  const verDetalle = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setPedidoSeleccionado(data);
      setPedidoId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModal = () => {
    setPedidoSeleccionado(null);
    setPedidoId(null);
  };

  if (!user) return <div className="text-center mt-5">Cargando perfil...</div>;

  return (
    <div className="container mt-5 position-relative">
      <div className="row">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center p-4 h-100">
            <div className="mb-3">
              <img src="https://via.placeholder.com/150" alt="avatar" className="rounded-circle border border-3 border-dark"/>
            </div>
            <h4 className="text-capitalize">{user.nombre}</h4>
            <p className="text-muted">{user.email}</p>
            <span className={`badge mb-3 fs-6 ${user.rol === 'admin' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>
              Rol: {user.rol ? user.rol.toUpperCase() : "USUARIO"}
            </span>
            <hr />
            <div className="text-start px-2">
              <p className="small mb-1"><strong>ID:</strong> {user.id}</p>
              <button className="btn btn-outline-danger w-100 mt-4" onClick={logout}>Cerrar Sesión</button>
            </div>
          </div>
        </div>

        <div className="col-md-8">

          {user.rol === "admin" && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-warning text-dark fw-bold">⚙️ Panel Admin</div>
              <div className="card-body d-flex gap-2">
                 <Link to="/admin" className="btn btn-dark flex-grow-1">➕ Nuevo Producto</Link>
                 <Link to="/mis-publicaciones" className="btn btn-outline-dark flex-grow-1">📦 Mis Posts ({misPublicacionesCount})</Link>
              </div>
            </div>
          )}

          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">
              🛍️ Mis Compras Realizadas
            </div>
            <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {pedidos.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No has realizado compras aún.</p>
                  <Link to="/" className="btn btn-sm btn-outline-primary">Ir a la Tienda</Link>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {pedidos.map((pedido) => (
                    <li key={pedido.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0 fw-bold">Pedido #{pedido.id}</h6>
                        <small className="text-muted">{new Date(pedido.created_at).toLocaleDateString()}</small>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className="badge bg-success fs-6">${pedido.total.toLocaleString("es-CL")}</span>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => verDetalle(pedido.id)}
                        >
                          👁️ Ver Detalle
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {pedidoSeleccionado && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">📦 Detalle del Pedido #{pedidoId}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  {pedidoSeleccionado.map((item, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center gap-3">
                      <img src={item.img} alt={item.titulo} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 text-capitalize">{item.titulo}</h6>
                        <small className="text-muted">
                          {item.cantidad} x ${item.precio.toLocaleString("es-CL")}
                        </small>
                      </div>
                      <span className="fw-bold">
                        ${(item.cantidad * item.precio).toLocaleString("es-CL")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Perfil;