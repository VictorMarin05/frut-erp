/**
 * Usuarios de Prueba para Desarrollo
 * Usa estos emails y contraseñas para testear cada rol
 */

export const USUARIOS_TEST = {
  repartidor: {
    email: 'repartidor@fruterp.com',
    password: '1234',
    usuario: {
      id: 1,
      email: 'repartidor@fruterp.com',
      nombre: 'Juan Repartidor',
      rol: 'repartidor'
    },
    access_token: 'mock_token_repartidor_12345'
  },
  administrador: {
    email: 'admin@fruterp.com',
    password: '1234',
    usuario: {
      id: 2,
      email: 'admin@fruterp.com',
      nombre: 'María Administradora',
      rol: 'administrador'
    },
    access_token: 'mock_token_admin_12345'
  },
  superadmin: {
    email: 'superadmin@fruterp.com',
    password: '1234',
    usuario: {
      id: 3,
      email: 'superadmin@fruterp.com',
      nombre: 'Carlos Superadmin',
      rol: 'superadmin'
    },
    access_token: 'mock_token_superadmin_12345'
  }
};

/**
 * Simula la respuesta del endpoint /token de FastAPI
 * @param {string} email 
 * @param {string} password 
 * @returns {{access_token: string, token_type: string, usuario: object} | null}
 */
export function validarCredenciales(email, password) {
  // Buscar usuario por email
  const usuarioEncontrado = Object.values(USUARIOS_TEST).find(
    u => u.email === email && u.password === password
  );

  if (!usuarioEncontrado) {
    return null;
  }

  // Retornar en el mismo formato que FastAPI
  return {
    access_token: usuarioEncontrado.access_token,
    token_type: 'bearer',
    usuario: usuarioEncontrado.usuario
  };
}
