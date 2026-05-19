# pulso_agency

Landing de Pulso Inteligente Agency.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Deploy automático

El repositorio usa `.github/workflows/deploy.yml` con esta estrategia:

1. **Siempre** compila el sitio Astro estático (`npm run build`).
2. Publica el resultado en **GitHub Pages** (flujo principal por defecto).
3. Si además existe configuración de VPS, también despliega al servidor por SSH/rsync.

### Comportamiento por escenario

- **Sin configuración VPS**: el job `deploy_vps` se omite y el workflow termina exitosamente con deploy a Pages.
- **Con configuración VPS completa**: además del deploy a Pages, se ejecuta deploy al VPS.
- Si falta cualquier valor VPS requerido (incluyendo `VPS_KNOWN_HOSTS`), el workflow continúa solo con GitHub Pages.
- **Sin `CUSTOM_DOMAIN`**: el build se genera compatible con `https://<usuario>.github.io/<repo>/`.
- **Con `CUSTOM_DOMAIN`**: el build usa rutas raíz (`/`) y además se publica `CNAME`.

### Placeholders de configuración

Configura estos valores en **Settings → Secrets and variables → Actions**:

#### Repository Variables

- `CUSTOM_DOMAIN` (opcional): dominio personalizado para Pages. Si existe, el workflow crea `dist/CNAME`.
- `VPS_HOST` (opcional): host/IP del VPS.
- `VPS_USER` (opcional): usuario SSH.
- `VPS_PORT` (opcional, default `22`): puerto SSH del VPS.
- `VPS_TARGET_DIR` (opcional): ruta destino en el servidor (ej. `/var/www/pulso_agency`).

#### Repository Secrets

- `VPS_SSH_KEY` (opcional): clave privada SSH para conectar al VPS.
- `VPS_KNOWN_HOSTS` (requerido para VPS): contenido de `known_hosts` para validar huella del servidor.

> Para habilitar deploy VPS, define `VPS_HOST`, `VPS_USER`, `VPS_TARGET_DIR`, `VPS_SSH_KEY` y `VPS_KNOWN_HOSTS`.

## Rehabilitar/ajustar despliegue a VPS después

No hace falta rediseñar el workflow: solo agrega/actualiza los variables/secrets anteriores y vuelve a ejecutar el workflow (`push` a `main` o `workflow_dispatch`).
