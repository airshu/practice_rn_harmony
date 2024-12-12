export class Point {
  x: number = 0
  y: number = 0

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export let Origin = new Point(0, 0);

export function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

export function add(a:number, b:number):number {
  let c = a + b;
  console.info('Dynamic import, %d + %d = %d', a, b, c);
  return c;
}