export class Particle {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;

    this.density = Math.random() * 10 + 2;
  }
}
