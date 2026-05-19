import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const customDomain = process.env.CUSTOM_DOMAIN?.trim();
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const determineBasePath = () => {
  if (isGitHubActions && !customDomain && repository) {
    return `/${repository}`;
  }

  return '/';
};

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  base: determineBasePath(),
  site: customDomain ? `https://${customDomain}` : undefined,
});
