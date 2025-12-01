export function mod(a: number, m: number): number {
  return a - m * Math.floor(a / m);
}
