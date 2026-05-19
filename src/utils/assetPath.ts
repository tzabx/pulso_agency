const trimTrailingSlash = (value: string) => value.endsWith('/') ? value.slice(0, -1) : value;

export const withBasePath = (path: string) => {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return path;
  }

  const basePath = trimTrailingSlash(import.meta.env.BASE_URL);
  return `${basePath}${path}`;
};
