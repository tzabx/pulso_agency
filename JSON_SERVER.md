# JSON Server Setup

Este proyecto ahora integra **json-server** para edición de datos en tiempo real desde React, con sincronización automática a los archivos fuente.

## Estructura

```
db.json                          # Base de datos para json-server
shared/data/
  ├── home.json                  # Contenido de página (sections, meta)
  └── site.json                  # Configuración global
scripts/
  ├── sync-db.js                 # Copia shared/data/ → db.json
  └── export-db.js               # Copia db.json → shared/data/
```

## Scripts NPM

### Desarrollo

**Opción 1: Ejecutar componentes por separado**
```bash
npm run dev:astro                # Astro en http://localhost:3000
npm run dev:react                # React en http://localhost:5173
npm run server                   # json-server en http://localhost:3001
```

**Opción 2: Ejecutar todo junto (requiere 3 terminales o usar concurrently)**
```bash
npm run dev:all                  # Inicia Astro + React + json-server en paralelo
```

### Sincronización

```bash
npm run sync:db                  # Carga datos desde shared/data/ al db.json
npm run export:db                # Exporta cambios desde db.json a shared/data/
```

## Flujo de Edición

### Editar vía React (Recomendado)

1. Iniciar json-server: `npm run server`
2. Iniciar React: `npm run dev:react`
3. Abrir http://localhost:5173
4. Presionar **Ctrl+Shift+E** para abrir el editor flotante
5. Editar contenido en las tabs (Site, Meta, Sections, Data)
6. Los cambios se guardan automáticamente en `db.json` (servidor)
7. Cuando Astro compile, usará los datos actualizados

### Sincronizar con Astro

Después de editar en React, sincroniza los cambios a shared/data/ para que Astro los use:

```bash
npm run export:db
npm run build:astro
```

## Detalles Técnicos

### EditProvider (React)

- **Inicialización**: Intenta cargar desde json-server; fallback a localStorage si no está disponible
- **Persistencia**: Guarda cambios automáticamente en json-server (PUT requests)
- **Fallback**: Si json-server falla, guarda en localStorage
- **Status**: AdminPanel muestra el estado (✓ Server, ⓘ LocalStorage, ⟳ Syncing, ✗ Error)

### json-server Endpoints

```
GET    /home              → Devuelve contenido de página
PUT    /home              → Actualiza contenido de página
GET    /site              → Devuelve configuración del sitio
PUT    /site              → Actualiza configuración del sitio
```

### Astro

Astro sigue usando archivos estáticos desde `shared/data/`. Para obtener cambios hechos en React:

1. Ejecuta `npm run export:db` (copia db.json → shared/data/)
2. Reinicia Astro o ejecuta `npm run build:astro`

## Flujos de Trabajo Recomendados

### Development (Con ambos frameworks)

```bash
# Terminal 1: json-server
npm run server

# Terminal 2: React (editor)
npm run dev:react

# Terminal 3: Astro (preview)
npm run dev:astro
```

Luego abre React en http://localhost:5173, edita con el panel flotante, y verifica cambios en Astro en http://localhost:3000

### Production (Astro)

```bash
npm run export:db          # Sincroniza cambios desde db.json
npm run build:astro        # Compila Astro
npm run preview            # Preview del build estático
```

## Nota: localStorage Fallback

Si json-server no está disponible, React automáticamente usa localStorage para persistencia. Esto permite:

- Editar sin servidor (útil en desarrollo con conexión perdida)
- Migración progresiva a json-server

Los cambios se guardan en localStorage bajo la clave `editor_draft`.

