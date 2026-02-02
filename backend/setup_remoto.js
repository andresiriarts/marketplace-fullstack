import pg from 'pg';
const { Pool } = pg;

// Tu URL de Render
const connectionString = "postgresql://posts_ksws_user:8uTBEtaQuCP5U3rrPQWNaEsU1iRiU1kR@dpg-d600a5m3jp1c73ci7ba0-a.oregon-postgres.render.com/posts_ksws";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // OBLIGATORIO para Render
  },
});

const scriptSQL = `
  -- 1. LIMPIEZA
  DROP TABLE IF EXISTS detalle_pedidos CASCADE;
  DROP TABLE IF EXISTS pedidos CASCADE;
  DROP TABLE IF EXISTS favorites CASCADE;
  DROP TABLE IF EXISTS posts CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  -- 2. CREAR TABLAS
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      rol VARCHAR(20) DEFAULT 'usuario',
      created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio INT NOT NULL,
      stock INT NOT NULL,
      img VARCHAR(1000),
      usuario_id INT REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE favorites (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES users(id) ON DELETE CASCADE,
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(usuario_id, post_id)
  );

  CREATE TABLE pedidos (
      id SERIAL PRIMARY KEY,
      usuario_id INT REFERENCES users(id),
      total INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE detalle_pedidos (
      id SERIAL PRIMARY KEY,
      pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
      producto_id INT REFERENCES posts(id),
      cantidad INT NOT NULL,
      precio INT NOT NULL
  );

  -- 3. DATOS DE PRUEBA
  INSERT INTO posts (titulo, descripcion, precio, stock, img) VALUES
  ('Mouse Gamer RGB', 'Mouse ergonómico.', 25990, 50, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
  ('Teclado Mecánico', 'Teclado 60% switches azules.', 45990, 30, 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
  ('Monitor Curvo', '144Hz 1ms.', 120000, 15, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
`;

const ejecutar = async () => {
  try {
    console.log("⏳ Conectando a la Nube en Render...");
    await pool.query(scriptSQL);
    console.log("✅ ¡LISTO! Tablas creadas y productos insertados.");
  } catch (error) {
    console.error("❌ ERROR:", error);
  } finally {
    await pool.end();
  }
};

ejecutar();