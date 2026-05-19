const trimTrailingSlash = (value: string) => {
  if (!value.endsWith('/')) {
    return value;
  }

  return value.slice(0, -1);
};

const basePath = trimTrailingSlash(import.meta.env.BASE_URL);

/**
 * Prefixes root-relative static asset paths with Astro's configured base URL.
 * Protocol-relative URLs (`//...`) and non-root-relative values are returned as-is.
 */
export const withBasePath = (path: string) => {
  if (!path.startsWith('/')) {
    return path;
  }

  if (path.startsWith('//')) {
    return path;
  }

  return `${basePath}${path}`;
};
