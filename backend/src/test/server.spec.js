import request from 'supertest';
import app from '../../index.js';

describe('Operaciones CRUD de usuarios', () => {
  
  const idAleatorio = Math.floor(Math.random() * 9999);
  const usuarioTest = {
    nombre: "Tester",
    email: `test${idAleatorio}@jest.com`,
    password: "123",
    rol: "usuario"
  };

  let tokenRecibido = "";

  it('Debe registrar un nuevo usuario y devolver código 201', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send(usuarioTest);

    expect(response.statusCode).toBe(201);
  });

  it('Debe loguear al usuario y devolver un token (Código 200)', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: usuarioTest.email,
        password: usuarioTest.password
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    
    tokenRecibido = response.body.token;
  });

  it('Debe rechazar acceso a ruta protegida sin token (Código 401)', async () => {
    const response = await request(app)
      .get('/usuarios');

    expect(response.statusCode).toBe(401);
  });

  it('Debe permitir acceso a ruta protegida con token válido (Código 200)', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${tokenRecibido}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(usuarioTest.email);
  });
});