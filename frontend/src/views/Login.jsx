import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" placeholder="******" />
              </div>
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
            <p className="text-center mt-3">
              ¿No tienes cuenta? <Link to="/registrarse">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;