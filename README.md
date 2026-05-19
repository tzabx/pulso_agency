# pulso_agency

Pulso Inteligente Agency landing page.

## Local development

```bash
npm ci
npm run dev
```

## Automatic deployment

This repository uses `.github/workflows/deploy.yml` with the following strategy:

1. It **always** builds the static Astro site (`npm run build`).
2. It publishes the output to **GitHub Pages** (default primary path).
3. If VPS configuration is present, it also deploys to the server via SSH/rsync.

### Behavior by scenario

- **Without VPS configuration**: the `deploy_vps` job is skipped and the workflow still succeeds with Pages deployment.
- **With full VPS configuration**: in addition to Pages deployment, the workflow deploys to the VPS.
- If any required VPS value is missing (including `VPS_KNOWN_HOSTS`), the workflow continues with GitHub Pages only.
- **Without `CUSTOM_DOMAIN`**: the build is generated to work with `https://<user>.github.io/<repo>/`.
- **With `CUSTOM_DOMAIN`**: the build uses root paths (`/`) and also publishes `CNAME`.

### Configuration placeholders

Set the following values in **Settings → Secrets and variables → Actions**:

#### Repository Variables

- `CUSTOM_DOMAIN` (optional): custom domain for Pages. If set, the workflow creates `dist/CNAME`.
- `VPS_HOST` (optional): VPS host/IP.
- `VPS_USER` (optional): SSH username.
- `VPS_PORT` (optional, default `22`): VPS SSH port.
- `VPS_TARGET_DIR` (optional): target directory on the server (e.g., `/var/www/pulso_agency`).

#### Repository Secrets

- `VPS_SSH_KEY` (optional): private SSH key to connect to the VPS.
- `VPS_KNOWN_HOSTS` (required for VPS): `known_hosts` content used to validate the server fingerprint.

> To enable VPS deployment, define `VPS_HOST`, `VPS_USER`, `VPS_TARGET_DIR`, `VPS_SSH_KEY`, and `VPS_KNOWN_HOSTS`.

## Re-enable/adjust VPS deployment later

No workflow redesign is needed: just add/update the variables/secrets above and run the workflow again (push to `main` or `workflow_dispatch`).
