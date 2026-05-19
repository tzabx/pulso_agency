import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const customDomain = process.env.CUSTOM_DOMAIN?.trim();
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const base = isGitHubActions && !customDomain && repository ? `/${repository}` : '/';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  base,
  site: customDomain ? `https://${customDomain}` : undefined,
});
