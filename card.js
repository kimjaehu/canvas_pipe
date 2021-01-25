export class Card {
  constructor(img, x, y, cardSize) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.cardSize = cardSize;

    this.speed = 0;
    this.gravity = 0.098;
    this.gravitySpeed = 0;
  }

  animate(ctx) {
    this.gravity = 0.098;

    ctx.beginPath();
    // ctx.fillStyle = "#000000";
    // ctx.strokeStyle = "#ffffff";
    // ctx.fillRect(this.x, this.y, this.cardSize, this.cardSize);
    // ctx.strokeRect(this.x, this.y, this.cardSize, this.cardSize);

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.cardSize,
      this.cardSize,
      this.x,
      this.y,
      this.cardSize,
      this.cardSize
    );
    ctx.fill();
    this.gravitySpeed += this.gravity;
    this.y += this.speed + this.gravitySpeed;
    return this.y;
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.px,
      this.py,
      this.cardSize,
      this.cardSize,
      this.px,
      this.py,
      this.cardSize,
      this.cardSize
    );
  }
}
