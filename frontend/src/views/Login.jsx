import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/MyContext';

const Login = () => {
  const { loginUser } = useContext(MyContext);
  
  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { type, value } = e.target;
    const fieldName = type === "email" ? "email" : "password";
    setUsuario({ ...usuario, [fieldName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario.email || !usuario.password) {
      return alert("Faltan datos");
    }
    loginUser(usuario);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="name@example.com" 
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="******" 
                  onChange={handleInput}
                />
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