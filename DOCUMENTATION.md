## Módulo de Autenticación y Seguridad (RBAC)
Se implementó un sistema de Control de Acceso Basado en Roles (RBAC) utilizando React Context API.

## Persistencia: Los datos del usuario y el token JWT se almacenan en localStorage, permitiendo que la sesión sea persistente tras recargas del navegador.

## Protección de Interfaz: Se utiliza la propiedad booleana es_admin del objeto user para renderizar condicionalmente elementos críticos (como el botón de registro de libros).

## Seguridad en API: Cada petición saliente es interceptada para adjuntar el Authorization: Bearer <token> en las cabeceras.

## Módulo de Gestión de Libros e Integración con API Externa
## Proxy de Datos: El backend actúa como intermediario con la API de Open Library.

## Flujo de Registro: Al ingresar un ISBN, el sistema realiza una petición GET para recuperar metadatos (Título, Autor, Editorial), minimizando errores de entrada manual.

## Validación de Esquema: La comunicación con FastAPI se rige por modelos de Pydantic, asegurando que campos como isbn y editorial sean obligatorios y tengan el formato correcto.

## "El desarrollo de esta fase integró exitosamente el frontend con servicios externos y lógicas de autorización. La principal dificultad técnica resuelta fue la sincronización de esquemas de datos (422 Unprocessable Entity), lo que se solucionó estandarizando los objetos de transferencia de datos (DTO) entre el cliente React y los modelos Pydantic de FastAPI."

## Gestión de Transacciones de Préstamo
Se implementó un flujo transaccional para la reserva de ejemplares:

## Servicio Dedicado: Creación de loanService.js (o integración en bookService.js) para manejar peticiones POST hacia /prestamos.

## Consumo de API: El sistema envía el libro_id y recibe un objeto de confirmación con el siguiente esquema:

## prestado_en: Fecha de inicio del préstamo.

## devolver_en: Fecha límite de devolución (calculada por el backend).

## usuario_id: Identificador vinculado automáticamente mediante el Token JWT.

## Reactividad: La interfaz de usuario (Books.jsx) responde al éxito de la operación actualizando el estado local del catálogo sin necesidad de recargar la página completa, optimizando el ancho de banda.

## Arquitectura de Componentes y Registro
## Refactorización UI/UX: Se aplicó el patrón de Componentes Presentacionales y de Contenedor. La lógica de estado se maneja en las páginas (Login.jsx, Register.jsx), mientras que la interfaz reside en componentes atómicos (LoginForm.jsx, RegisterForm.jsx).

## Gestión de Usuarios: Implementación del endpoint POST /usuarios/ para el registro de nuevos miembros.

## Sistema de Enrutamiento: Definición de Rutas Públicas (acceso universal) y Rutas Privadas (requieren JWT), corrigiendo el flujo de redirección para permitir el registro de usuarios anónimos.