# Sistema de Gestión de Biblioteca - Frontend
Aplicación moderna construida con React.js y Tailwind CSS v4 para el consumo de una API de préstamos de libros.

## Tecnologías Utilizadas
- **React (Vite):** Biblioteca principal para la interfaz.
- **Tailwind CSS v4:** Framework de diseño (Zero-config engine).
- **Axios:** Cliente HTTP para comunicación con FastAPI.
- **React Router DOM:** Gestión de navegación y rutas.

## Arquitectura
Se utiliza una estructura modular desacoplada:
- `/src/api`: Servicios de conexión.
- `/src/context`: Estado global de autenticación (JWT).
- `/src/pages`: Vistas de usuario y administrador.