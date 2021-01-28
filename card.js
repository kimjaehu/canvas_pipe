export class Card {
  constructor(img, x, y, cardSize, speed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.cardSize = cardSize;

    this.scale = 0;
    this.speed = speed;
    this.gravity = 0.01;
    this.gravitySpeed = 0;
  }

  animate(ctx) {
    // this.gravity = 0.098;
    ctx.save();
    // ctx.beginPath();

    ctx.fillStyle = "#000000";
    // ctx.strokeStyle = "#ffffff";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    console.log(this.cardSize);
    ctx.arc(this.x, this.y, this.cardSize, 0, Math.PI * 2, false);

    ctx.scale(this.scale, this.scale);

    // ctx.clip();

    // ctx.drawImage(
    //   this.img,
    //   this.x,
    //   this.y,
    //   this.cardSize,
    //   this.cardSize,
    //   this.x,
    //   this.y,
    //   this.cardSize,
    //   this.cardSize
    // );

    ctx.fill();

    ctx.restore();

    this.scale += 0.1;

    // this.gravitySpeed += this.gravity;
    // this.y += this.speed + this.gravitySpeed;
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
