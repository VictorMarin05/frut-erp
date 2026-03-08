import { createContext, useContext, useState, useEffect } from 'react';
import { validarCredenciales } from '../data/usuariosTest';

const AuthContext = createContext();

// Flag para usar demo mode (cambiar a false cuando tengas backend real)
const USAR_MOCK = true;

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Restaurar sesión al cargar la app
  useEffect(() => {
    const sessionGuardada = localStorage.getItem('fruterp_session');
    if (sessionGuardada) {
      try {
        const { usuario: u, token: t } = JSON.parse(sessionGuardada);
        setUsuario(u);
        setToken(t);
      } catch (error) {
        console.error('Error restaurando sesión:', error);
        localStorage.removeItem('fruterp_session');
      }
    }
    setCargando(false);
  }, []);

  const login = async (email, password) => {
    try {
      let data;

      if (USAR_MOCK) {
        // Usar credenciales de prueba en local
        data = validarCredenciales(email, password);
        if (!data) {
          throw new Error('Email o contraseña incorrectos');
        }
      } else {
        // Conectar con backend real
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch("http://localhost:8000/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Credenciales inválidas');
        }

        data = await response.json();
      }

      const { access_token, usuario: usuarioData } = data;

      // Guardar sesión
      localStorage.setItem('fruterp_session', JSON.stringify({
        usuario: usuarioData,
        token: access_token
      }));

      setUsuario(usuarioData);
      setToken(access_token);
      
      return { exito: true, error: null };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('fruterp_session');
    setUsuario(null);
    setToken(null);
  };

  const value = {
    usuario,
    token,
    cargando,
    login,
    logout,
    estaAutenticado: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
