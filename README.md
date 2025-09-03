# FPFC - Sistema de Archivos

## Descripción
Sistema de gestión de archivos para el Archivo Nacional, desarrollado con HTML, CSS (Tailwind) y JavaScript vanilla.

## Características Principales

### Dashboard
- Panel de control con estadísticas del inventario
- Vista de artículos recientes con acciones de edición y eliminación
- Botón "Agregar Soporte" para crear nuevos registros
- Navegación a diferentes secciones del sistema

### Formulario de Registro
Formulario acordeón con las siguientes secciones:

#### 1. Información Básica
- Imagen miniatura (upload de archivo)
- Código (número)
- Título (texto)
- Año (dropdown)
- País (dropdown con países latinoamericanos y europeos)
- Empresa productora (dropdown con empresas colombianas)
- Director/a (texto)
- Duración (tiempo)
- Actual (número)
- Antiguo (número)

#### 2. Identificación y Características del Material
- Imagen (texto)
- Sonido (texto)
- Tipo de material (checkboxes: negativo, positivo, reversible, blanco, negro, color)

#### 3. Producción y Créditos
- Productor ejecutivo
- Productor asociado
- Guionista
- Fotógrafo
- Editor

#### 4. Soporte Actual
- Tipo de soporte (checkboxes: fílmico, magnético, óptico, digital, restaurado)
- Fecha restauración
- Resolución/códec
- Peso con unidades (KG, Grs, Lbs)
- Aspect ratio
- FPS

#### 5. Historial de pH
- Input para nuevo registro
- Tabla de historial de registros

#### 6. Ubicación y Almacenamiento
- Tipo de ubicación (signatura o bóveda)
- Código de ubicación

#### 7. Descripción y Materiales Relacionados
- Sinopsis (textarea)
- Sistema de créditos con roles (actor, producción, escritor, etc.)
- Tabla dinámica de créditos

#### 8. Adjuntos
- Guión
- Materiales adicionales (fotografías, cartel, sonido)
- Observaciones con historial
- Link Koha

## Funcionalidades

### Crear Nuevo Registro
1. Hacer clic en "Agregar Soporte" en el dashboard
2. Se abre el formulario en una ventana emergente
3. Completar los campos requeridos
4. Guardar como borrador o guardar y cerrar

### Editar Registro Existente
1. Hacer clic en "Editar" en la tabla de artículos
2. Se abre el formulario con los datos existentes
3. Modificar los campos necesarios
4. Guardar cambios

### Eliminar Registro
1. Hacer clic en "Eliminar" en la tabla de artículos
2. Confirmar la eliminación
3. El registro se elimina del sistema

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos con Tailwind CSS
- **JavaScript**: Funcionalidad del lado del cliente
- **LocalStorage**: Almacenamiento temporal de datos

## Estructura de Archivos

```
fpfc/
├── pages/
│   ├── dashboard.html      # Panel principal
│   ├── record-form.html    # Formulario de registro
│   ├── inventory.html      # Página de inventario
│   ├── users.html          # Gestión de usuarios
│   ├── reports.html        # Reportes
│   └── perfil.html         # Perfil de usuario
├── img/
│   └── fpfclogo.jpg        # Logo del sistema
├── styles.css              # Estilos adicionales
├── script.js               # Scripts globales
└── README.md               # Este archivo
```


## Notas de Desarrollo

- El sistema utiliza localStorage para almacenar datos temporalmente
- El formulario está diseñado como acordeón para mejor organización
- La primera sección (Información Básica) está abierta por defecto
- Este proyecto es un mock visual, principalmente HTML y CSS para dar una idea de como seria el look and feel del proyecto.