export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function getPosStr(x: number, y: number): string {
  return `${x},${y}`;
}

export function getCoordsFromStr(s: string): number[] {
  return s.split(',').map((n) => Number(n));
}
