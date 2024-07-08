# Soft Jobs - Backend Authentication & Authorization

Este proyecto es el backend para la plataforma Soft Jobs, que permite a desarrolladores junior obtener trabajos cortos y sencillos para acumular experiencia laboral. El backend proporciona autenticación y autorización de usuarios utilizando JWT (JSON Web Tokens).

## Requisitos del Proyecto

1. **Registro de nuevos usuarios** a través de una ruta `POST /usuarios`.
2. **Inicio de sesión de usuarios** a través de una ruta `POST /login` que devuelve un token JWT.
3. **Obtener datos del usuario** autenticado a través de una ruta `GET /usuarios`.
   - Extraer el token de la propiedad `Authorization` de las cabeceras.
   - Verificar la validez del token usando la misma llave secreta usada en su firma.
   - Decodificar el token para obtener el email del usuario del payload.
   - Obtener y devolver el registro del usuario.

## Cumplimiento de Requisitos
1. **Registro de Usuarios**

Ruta: POST /api/usuarios

El servidor permite el registro de nuevos usuarios. Los datos se validan y la contraseña se encripta antes de almacenarse en la base de datos.
2. **Inicio de Sesión**

Ruta: POST /api/login

El servidor permite a los usuarios iniciar sesión y devuelve un token JWT si las credenciales son correctas. El token contiene el email del usuario en el payload.
3. **Obtener Datos del Usuario Autenticado**

Ruta: GET /api/usuarios

El servidor verifica la validez del token JWT, lo decodifica para obtener el email del usuario, y devuelve los datos del usuario si está autenticado correctamente.

Middleware y Seguridad

    Verificación de Credenciales: El middleware checkCredentials verifica la existencia de c

## Tecnologías Utilizadas

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens (JWT)
- Bcrypt

## Configuración del Proyecto

### Base de Datos

Ejecuta el siguiente script SQL en tu terminal `psql` para crear la base de datos y la tabla necesaria:

```sql
CREATE DATABASE softjobs;
\c softjobs;
CREATE TABLE usuarios (
  id SERIAL, 
  email VARCHAR(50) NOT NULL, 
  password VARCHAR(60) NOT NULL, 
  rol VARCHAR(25), 
  lenguage VARCHAR(20)
);
SELECT * FROM usuarios;

redenciales en las rutas correspondientes.
    Validación de Token: El middleware verifyToken valida el token recibido en las cabeceras.
    Registro de Consultas: El middleware morgan reporta las consultas recibidas en el servidor.
    Encriptación de Contraseñas: Las contraseñas se encriptan al momento de registrar nuevos usuarios utilizando bcrypt.
