# SGSI LA MARINA - Sistema de Gestión de Seguridad de la Información

## Estructura del Proyecto

```
SGSI-LAMARINA/
├── index.html              # Página principal
├── main.js                 # Funciones principales del sistema
├── style.css               # Estilos globales
├── package.json
├── assets/                 # Imágenes y recursos
├── docs/                   # Documentos descargables
├── features/
│   └── form/
│       ├── login.html      # Página de inicio de sesión
│       └── forms.css       # Estilos del formulario
└── js/                     # Módulos JavaScript
    ├── auth.js             # Gestión de autenticación
    ├── hallazgos.js        # Gestión de hallazgos
    └── ui-manager.js       # Gestión de interfaz por rol
```

## Usuarios del Sistema

### 1. **Trabajador**
- **Usuario:** `trabajador`
- **Contraseña:** `trabajador`
- **Permisos:**
  - Puede registrar nuevos hallazgos
  - Ve el formulario de registro de hallazgos
  - NO puede ver, editar o eliminar hallazgos existentes

### 2. **Admin**
- **Usuario:** `admin`
- **Contraseña:** `admin`
- **Permisos:**
  - Puede ver todos los hallazgos registrados
  - Puede marcar hallazgos como resueltos o pendientes
  - Puede eliminar hallazgos
  - NO ve el formulario de registro (solo consulta)

## Funcionalidades

### Autenticación (auth.js)
- Gestión de sesiones con `localStorage`
- Validación de credenciales
- Control de acceso por rol
- Cierre de sesión

### Gestión de Hallazgos (hallazgos.js)
- Registro de hallazgos con información completa
- Almacenamiento persistente en `localStorage`
- Estado de hallazgos (pendiente/resuelto)
- Historial de quién creó cada hallazgo
- Renderizado dinámico de la lista

### Gestión de UI (ui-manager.js)
- Inicialización de la interfaz según rol
- Mostrar/ocultar elementos según permisos
- Información del usuario en el header
- Botón de cerrar sesión

## Flujo de Trabajo

1. **Login:**
   - Usuario accede a `features/form/login.html`
   - Ingresa credenciales
   - Sistema valida y guarda sesión en localStorage
   - Redirige a `index.html`

2. **Vista Trabajador:**
   - Ve formulario para registrar hallazgos
   - Completa: descripción, impacto, recomendación, responsable
   - Al guardar, se almacena en localStorage con su nombre de usuario
   - Recibe confirmación del registro

3. **Vista Admin:**
   - Ve lista completa de todos los hallazgos
   - Puede cambiar estado (pendiente ↔ resuelto)
   - Puede eliminar hallazgos con confirmación
   - Ve quién creó cada hallazgo y cuándo

4. **Cierre de Sesión:**
   - Botón en el header
   - Limpia sesión de localStorage
   - Redirige al login

## Almacenamiento Local

### userSession
```json
{
  "username": "admin",
  "role": "admin",
  "loginTime": "2025-11-27T10:30:00.000Z"
}
```

### hallazgos
```json
[
  {
    "id": "H-1732708200000",
    "descripcion": "Fallo en sincronización de inventario",
    "impacto": "Sobreventa",
    "recomendacion": "Implementar validaciones en tiempo real",
    "responsable": "Equipo TI",
    "createdBy": "trabajador",
    "createdAt": "2025-11-27T10:30:00.000Z",
    "status": "pendiente"
  }
]
```

## Mejores Prácticas Implementadas

1. **Separación de Responsabilidades:**
   - Autenticación en módulo independiente
   - Lógica de negocio separada de la UI
   - Gestión de datos en módulo específico

2. **Seguridad:**
   - Validación de sesión en cada carga
   - Control de acceso basado en roles
   - Escapado de HTML para prevenir XSS

3. **Persistencia:**
   - Uso de localStorage para datos
   - Estructura JSON clara y mantenible

4. **UX/UI:**
   - Interfaz adaptada a cada rol
   - Feedback inmediato al usuario
   - Confirmaciones para acciones críticas

5. **Mantenibilidad:**
   - Código modular y reutilizable
   - Comentarios claros
   - Nombres descriptivos de funciones y variables

## Cómo Usar

1. Abrir `features/form/login.html` en el navegador
2. Ingresar con uno de los usuarios disponibles
3. Explorar las funcionalidades según el rol
4. Para cambiar de usuario, cerrar sesión y volver a ingresar

## Notas Técnicas

- **Compatibilidad:** Requiere navegador con soporte para ES6+ y localStorage
- **Datos:** Se almacenan localmente, no se envían a ningún servidor
- **Sesión:** Persiste hasta que el usuario cierre sesión manualmente
