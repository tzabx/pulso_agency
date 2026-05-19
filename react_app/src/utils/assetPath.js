const trimTrailingSlash = (value) => {
  if (!value.endsWith('/')) {
    return value;
  }

  return value.slice(0, -1);
};

const basePath = trimTrailingSlash(import.meta.env.BASE_URL || '/');

export const withBasePath = (path) => {
  if (!path.startsWith('/')) {
    return path;
  }

  if (path.startsWith('//')) {
    return path;
  }

  return `${basePath}${path}`;
};
