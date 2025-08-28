# FPFC - Sistema de Archivos

Sistema de gestión de archivos para la Fundación Patrimonio Fílmico Colombiano.

## Estructura del Proyecto

```
fpfc/
├── pages/                 # Páginas HTML de la aplicación
│   ├── index.html        # Página de login
│   ├── dashboard.html    # Panel principal
│   ├── inventory.html    # Gestión de inventario
│   ├── users.html        # Gestión de usuarios
│   ├── perfil.html       # Perfil de usuario
│   ├── reports.html      # Generación de reportes
│   └── detail.html       # Detalle de registro
├── img/                  # Imágenes del proyecto
│   └── fpfclogo.jpg     # Logo de FPFC
├── script.js             # Funcionalidad JavaScript común
├── styles.css            # Estilos CSS personalizados
└── README.md             # Este archivo
```

## Funcionalidades Implementadas

### 1. Sistema de Autenticación
- **Login**: Formulario de acceso con validación
- **Credenciales**: Usuario: cualquier email, Contraseña: `12345678`
- **Botón deshabilitado**: Se habilita solo cuando ambos campos tienen datos
- **Redirección**: Al dashboard tras login exitoso

### 2. Gestión de Inventario
- **Búsqueda en tiempo real**: Filtrado por título, director, etc.
- **Filtros activos**: Botones para filtrar por nombre, año, material, autor
- **Filtro por defecto**: "Nombre" seleccionado automáticamente
- **Tabla dinámica**: Se actualiza según búsqueda y filtros
- **Navegación**: Enlaces a página de detalle

### 3. Gestión de Usuarios
- **Agregar usuario**: Modal con formulario completo
- **Campos**: Nombre, email, rol, estado
- **Roles disponibles**: Administrador, Editor, Visualizador
- **Estados**: Activo, Inactivo
- **Acciones**: Editar, Activar/Desactivar, Asignar Rol

### 4. Sistema de Perfil
- **Información personal**: Nombre, email, teléfono, departamento, biografía
- **Edición**: Formularios editables con validación
- **Seguridad**: Cambio de contraseña, autenticación de dos factores
- **Restauración**: Botón para restaurar valores originales

### 5. Generación de Reportes
- **Campos arrastrables**: Selección de campos por drag & drop
- **Opciones de exportación**: Excel, CSV, PDF
- **Ordenamiento**: Por nombre, año, fecha, estado
- **Dirección**: Ascendente o descendente
- **Validación**: Al menos un campo debe ser seleccionado

### 6. Navegación y Perfil
- **Dropdown de perfil**: Accesible desde todas las páginas
- **Opciones**: Perfil, Cerrar Sesión
- **Logout**: Confirmación y redirección al login
- **Navegación consistente**: Enlaces entre todas las páginas

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos con Tailwind CSS
- **JavaScript ES6+**: Funcionalidad interactiva
- **Tailwind CSS**: Framework de utilidades CSS
- **Responsive Design**: Diseño adaptable a diferentes dispositivos

## Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Clona o descarga el proyecto
2. Abre `pages/index.html` en tu navegador
3. Usa las credenciales de prueba:
   - **Usuario**: cualquier email válido
   - **Contraseña**: `12345678`

### Desarrollo
- El proyecto está estructurado para facilitar el desarrollo
- Cada página tiene su propio JavaScript para funcionalidad específica
- `script.js` contiene funciones comunes reutilizables
- Los estilos siguen la guía de diseño de FPFC

## Características Técnicas

### Responsive Design
- Diseño adaptable a móviles, tablets y desktop
- Breakpoints optimizados para diferentes tamaños de pantalla
- Navegación intuitiva en dispositivos móviles

### Accesibilidad
- Etiquetas semánticas HTML5
- Contraste de colores optimizado
- Navegación por teclado
- Textos alternativos para imágenes

### Performance
- Carga lazy de recursos
- Optimización de CSS y JavaScript
- Uso eficiente de Tailwind CSS

## Estructura de Datos

### Usuario
```javascript
{
  id: number,
  nombre: string,
  email: string,
  rol: "Administrador" | "Editor" | "Visualizador",
  estado: "Activo" | "Inactivo",
  createdAt: string
}
```

### Inventario
```javascript
{
  id: number,
  nombre: string,
  año: string,
  material: string,
  autor: string,
  estado: string,
  fecha: string,
  notas: string
}
```

## Funciones JavaScript Principales

### Autenticación
- `login(username, password)`: Autentica al usuario
- `logout()`: Cierra la sesión
- `checkAuthStatus()`: Verifica el estado de autenticación

### Gestión de Datos
- `addUser(userData)`: Agrega nuevo usuario
- `getUsers()`: Obtiene lista de usuarios
- `generateReport(fields, options)`: Genera reporte

### Utilidades
- `showNotification(message, type)`: Muestra notificaciones
- `confirmAction(message)`: Solicita confirmación del usuario

## Personalización

### Colores
El proyecto utiliza la paleta de colores de FPFC:
- **Primario**: `#c39f3c` (Dorado)
- **Secundario**: `#8b7e5b` (Marrón claro)
- **Fondo**: `#fbfaf9` (Beige muy claro)
- **Texto**: `#191610` (Negro suave)

### Estilos
- Los estilos siguen las guías de diseño de FPFC
- Uso consistente de Tailwind CSS
- Componentes reutilizables y modulares

## Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] API REST para operaciones CRUD
- [ ] Sistema de permisos avanzado
- [ ] Historial de cambios
- [ ] Backup automático de datos
- [ ] Exportación a formatos adicionales
- [ ] Dashboard con gráficos y estadísticas
- [ ] Sistema de notificaciones en tiempo real

## Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo de FPFC.

---

**FPFC - Fundación Patrimonio Fílmico Colombiano**
*Sistema de Archivos v1.0*