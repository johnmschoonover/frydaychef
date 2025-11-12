const heroImages = import.meta.glob('../assets/images/**/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

export function resolveHero(path?: string) {
  if (!path) return undefined;
  const normalized = path.replace(/^\//, '');
  const key = normalized.startsWith('assets/')
    ? `../${normalized}`
    : normalized.startsWith('images/')
    ? `../assets/${normalized}`
    : `../assets/${normalized.replace(/^content\//, '')}`;
  return heroImages[key];
}
