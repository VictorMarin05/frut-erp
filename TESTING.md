# 🧪 Guía de Testing - Frut-ERP

## Credenciales de Prueba

Actualmente el sistema está en **modo desarrollo** con credenciales locales hardcodeadas. Todas las contraseñas son `1234`.

### Repartidor
- **Email**: `repartidor@fruterp.com`
- **Contraseña**: `1234`
- **Acceso**: Vista de ruta activa, entregas
- **Dashboard**: RutaActiva.jsx

### Administrador
- **Email**: `admin@fruterp.com`
- **Contraseña**: `1234`
- **Acceso**: Gestión de pedidos, rutas, reportes
- **Dashboard**: PanelAdministrador.jsx

### Superadmin
- **Email**: `superadmin@fruterp.com`
- **Contraseña**: `1234`
- **Acceso**: Todos los paneles + analytics y gerencia
- **Dashboard**: PanelGerencia.jsx (para analytics)

---

## ¿Cómo Cambiar a Backend Real?

Cuando tengas tu FastAPI + PostgreSQL listo:

### 1. Editar `src/context/AuthContext.jsx`
Cambiar esta línea de `true` a `false`:

```javascript
const USAR_MOCK = false;  // ← Cambiar a false
```

### 2. Asegurar que FastAPI responde correctamente
El endpoint `/token` debe devolver:

```json
{
  "access_token": "token_jwt_aqui",
  "token_type": "bearer",
  "usuario": {
    "id": 1,
    "email": "usuario@fruterp.com",
    "nombre": "Nombre Usuario",
    "rol": "repartidor"  // o "administrador" o "superadmin"
  }
}
```

### 3. Agregar usuarios a la BD PostgreSQL
Los valores `rol` deben ser exactamente:
- `repartidor`
- `administrador`
- `superadmin`

---

## Flujo de Testing Completo

### Test 1: Login de Repartidor
1. Ir a `/login`
2. Ingresar `repartidor@fruterp.com` / `1234`
3. ✅ Debe redirigir a `/` (RutaActiva)
4. ✅ Header debe mostrar "Juan Repartidor"
5. ✅ Menú debe mostrar rol `repartidor`
6. ✅ Logout debe limpiar localStorage y redirigir a login

### Test 2: Login de Administrador
1. Ir a `/login`
2. Ingresar `admin@fruterp.com` / `1234`
3. ✅ Debe redirigir a `/` (PanelAdministrador)
4. ✅ Header debe mostrar "María Administradora"
5. ✅ Acceso a `/administrador` debe mostrar el panel
6. ✅ Intento de acceso a `/gerencia` debe mostrar error 404

### Test 3: Login de Superadmin
1. Ir a `/login`
2. Ingresar `superadmin@fruterp.com` / `1234`
3. ✅ Debe redirigir a `/` (PanelGerencia)
4. ✅ Header debe mostrar "Carlos Superadmin"
5. ✅ Acceso a `/ruta-activa`, `/administrador`, `/gerencia` debe funcionar
6. ✅ Todos los paneles visibles

### Test 4: Credenciales Inválidas
1. Ir a `/login`
2. Ingresar `invalido@fruterp.com` / `1234`
3. ✅ Mostrar error: "Email o contraseña incorrectos"
4. ✅ Ambos campos deben vibrar y ponerse rojos
5. ✅ NO hacer logout (localStorage debe permanecer)

### Test 5: Persistencia de Sesión
1. Hacer login con cualquier rol
2. Recargar la página (F5)
3. ✅ Debe mantener la sesión sin redirigir a login
4. ✅ localStorage debe contener `fruterp_session`
5. ✅ Header debe mostrar el usuario de la sesión anterior

### Test 6: Protección de Rutas
1. Hacer logout
2. Intentar acceder a `/administrador` directamente en URL
3. ✅ Debe redirigir a `/login` (no mostrar contenido)
4. ✅ localStorage debe estar vacío

---

## Archivos Clave para Testing

| Archivo | Propósito |
|---------|-----------|
| `src/data/usuariosTest.js` | Credenciales de prueba y validación mock |
| `src/context/AuthContext.jsx` | Lógica de autenticación (flag USAR_MOCK) |
| `src/components/Login.jsx` | Formulario de login con panel de credenciales |
| `src/components/RutaProtegida.jsx` | Protección de rutas por rol |
| `src/App.jsx` | Configuración de React Router |

---

## Debugging

### Ver localStorage
Abre la consola del navegador y ejecuta:
```javascript
JSON.parse(localStorage.getItem('fruterp_session'))
```

Debe devolver:
```javascript
{
  usuario: { id: 1, email: "...", nombre: "...", rol: "..." },
  token: "mock_token_..."
}
```

### Ver estado de autenticación
En cualquier componente que use `useAuth()`:
```javascript
const { usuario, token, estaAutenticado, cargando } = useAuth();
console.log({ usuario, token, estaAutenticado, cargando });
```

---

## Checklist de Testing

- [ ] Todos los 3 roles pueden hacer login
- [ ] Cada rol ve su dashboard correspondiente
- [ ] Header aparece en todas las páginas protegidas
- [ ] Logout funciona y limpia localStorage
- [ ] Credenciales inválidas muestran error
- [ ] Sesión persiste al recargar página
- [ ] Rutas protegidas redirigen a login si no está autenticado
- [ ] Superadmin puede acceder a todos los paneles
- [ ] Repartidor NO puede acceder a `/administrador`
- [ ] Administrador NO puede acceder a `/gerencia`
