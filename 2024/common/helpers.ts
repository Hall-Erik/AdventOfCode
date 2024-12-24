export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function getPosStr(x: number, y: number): string {
  return `${x},${y}`;
}
