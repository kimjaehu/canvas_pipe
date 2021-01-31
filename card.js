export class Card {
  constructor(x, y, cardSize, red, green, blue, alpha) {
    this.x = x;
    this.y = y;
    this.cardSize = cardSize;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.save();
    ctx.fillStyle = `RGB(${this.red},${this.green},${this.blue},${this.alpha})`;
    // ctx.rect(this.x, this.y, this.cardSize, this.cardSize);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.cardSize);
    ctx.lineTo(this.x - this.cardSize, this.y - this.cardSize);
    // ctx.stroke();
    ctx.fill();
    // ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = `RGB(0,0,0)`;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.cardSize, this.y - this.cardSize);
    ctx.lineTo(this.x + this.cardSize, this.y);
    ctx.fill();
    // ctx.closePath();
  }
}
