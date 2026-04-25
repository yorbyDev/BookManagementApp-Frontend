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

## Módulo de Comunicación (API):
Se implementó un cliente centralizado con Axios que gestiona la persistencia de la sesión mediante interceptores, inyectando el JWT en las cabeceras de autorización de forma transparente para los componentes.

## El proyecto utiliza variables de entorno para la configuración de la API.

## Gestión de Estado Global (AuthContext):
Se ha implementado un Proveedor de Autenticación utilizando la Context API de React. Este módulo centraliza el estado de la sesión, gestiona la persistencia del JWT en el localStorage y provee métodos globales de login y logout para asegurar el desacoplamiento entre la lógica de sesión y los componentes visuales.

## Autenticación (Login):
Se completó la integración con el endpoint de seguridad del backend. El sistema procesa correctamente el formato x-www-form-urlencoded, valida credenciales y persiste el token de acceso en el cliente.

## Navegación y Seguridad (React Router):

Rutas Protegidas: Se implementó un componente de orden superior (Higher-Order Component) que actúa como middleware para validar la sesión antes de renderizar vistas privadas.

Layout Modular: Uso de rutas anidadas y el componente <Outlet /> para mantener una interfaz consistente (Navbar, Sidebar) sin recargar componentes comunes.

Gestión de Sesión: Implementación de flujo completo de Login/Logout con redireccionamiento programático mediante el hook useNavigate.