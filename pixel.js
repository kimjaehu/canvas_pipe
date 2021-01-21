const PI2 = Math.PI * 2;

export class Pixel {
  constructor(x, y, pixelSize, red, green, blue, alpha) {
    this.x = x;
    this.y = y;
    this.pixelSize = pixelSize;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  animate(ctx) {
    console.log(this.x, this.y, this.pixelSize, this.pixelSize);
    ctx.beginPath();
    ctx.fillStyle =
      "rgba(" +
      this.red +
      ", " +
      this.green +
      ", " +
      this.blue +
      ", " +
      this.alpha +
      ")";
    ctx.fillRect(this.x, this.y, this.pixelSize, this.pixelSize);
    ctx.fill();
  }
}
