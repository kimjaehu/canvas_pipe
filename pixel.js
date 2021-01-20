const PI2 = Math.PI * 2;

export class Pixel {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;

    this.density = Math.random() * 10 + 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, PI2);
  }
}
