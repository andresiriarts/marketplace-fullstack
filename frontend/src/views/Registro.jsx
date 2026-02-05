import { useState, useContext } from 'react';
import { MyContext } from '../context/MyContext';
import Swal from 'sweetalert2';

const Registro = () => {
  const { registerUser } = useContext(MyContext);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "usuario"
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUsuario({ ...usuario, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación 1: Campos vacíos
    if (!usuario.nombre || !usuario.email || !usuario.password || !usuario.confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos del formulario."
      });
    }

    // Validación 2: Contraseñas
    if (usuario.password !== usuario.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error de contraseña",
        text: "Las contraseñas no coinciden."
      });
    }

    const { confirmPassword, ...nuevoUsuario } = usuario;
    registerUser(nuevoUsuario);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={usuario.nombre}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={usuario.email}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="******"
                  value={usuario.password}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Repite tu contraseña"
                  value={usuario.confirmPassword}
                  onChange={handleInput}
                  style={{
                    borderColor: usuario.confirmPassword && usuario.password !== usuario.confirmPassword ? 'red' : ''
                  }}
                />
                {usuario.confirmPassword && usuario.password !== usuario.confirmPassword && (
                  <div className="form-text text-danger">Las contraseñas no coinciden.</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Rol de Usuario</label>
                <select
                  id="rol"
                  className="form-select"
                  value={usuario.rol}
                  onChange={handleInput}
                >
                  <option value="usuario">Cliente / Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                <div className="form-text text-muted">
                  Selecciona "Administrador" para gestionar productos.
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Registrarme</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;