export function mod(a: number, m: number): number {
  return a - m * Math.floor(a / m);
}

export function setCharAt(str: string, char: string, index: number) {
  return str.substring(0, index) + char + str.substring(index + 1);
}
