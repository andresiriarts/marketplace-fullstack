import { useState } from 'react';

const Registro = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Crear Cuenta</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" placeholder="******" />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input type="password" className="form-control" placeholder="******" />
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