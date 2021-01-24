export class Card {
  constructor(img, x, y, cardSize) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.cardSize = cardSize;
  }

  animate(ctx) {
    console.log(this.x, this.y, this.cardSize, this.cardSize);
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#ffffff";

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
    // ctx.fillStyle =
    // "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    ctx.fillRect(this.x, this.y, this.cardSize, this.cardSize);
    ctx.strokeRect(this.x, this.y, this.cardSize, this.cardSize);
    ctx.fill();

    this.y += 1;
  }
}
