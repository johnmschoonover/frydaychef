const heroImages = import.meta.glob('../content/images/**/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

export function resolveHero(path?: string) {
  if (!path) return undefined;
  const normalized = path.replace(/^\//, '');
  const key = normalized.startsWith('content/')
    ? `../${normalized}`
    : `../content/${normalized}`;
  return heroImages[key];
}
