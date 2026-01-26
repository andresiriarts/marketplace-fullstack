const Perfil = () => {
  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-header bg-dark text-white text-center">
          <h3>Mi Perfil</h3>
        </div>
        <div className="card-body text-center">
          <img 
            src="https://via.placeholder.com/150" 
            alt="avatar" 
            className="rounded-circle mb-3 border border-3"
          />
          <h4 className="card-title">Byron Iriarte</h4>
          <p className="card-text text-muted">byron@ejemplo.com</p>
          <hr />
          <div className="text-start">
            <p><strong>Dirección:</strong> Av. Siempre Viva 123</p>
            <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
            <button className="btn btn-outline-danger w-100 mt-3">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;