export class Drop {
  constructor() {
    this.x = 50;
    this.y = 0;

    this.speed = 1;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  animate(ctx) {
    console.log(this.y, this.stageHeight);
    if (this.y < this.stageHeight) {
      this.y += this.speed;
    }

    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
  }
}
