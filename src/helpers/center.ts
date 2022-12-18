export function center(c: string) {
  const width = process.stdout.columns ?? 80;
  const padding = Math.floor((width - c.length) / 2) - 1;
  return `${' '.repeat(padding)}${c}${' '.repeat(padding)}`;
}
