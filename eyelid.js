export class Eyelid {
  constructor() {
    this.speed = Math.random() * 2 + 100;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.cx = this.stageWidth / 2;
    this.cy1 = 0 - this.stageHeight;
    this.cy = 0 - this.stageHeight;
    this.cy2 = this.stageHeight + this.stageHeight;
    this.sx = 0 - this.stageWidth / 5;
    this.sy = this.stageHeight / 2;
    this.dx = this.stageWidth + this.stageWidth / 5;
    this.dy = this.stageHeight / 2;
    this.ty = 0;
    this.by = this.stageHeight + this.stageHeight / 5;
  }

  openEye(cy1, cy2) {
    if (cy1 > this.dy) {
      this.speed *= -1;
      cy1 += this.speed;
      cy2 -= this.speed;
    }
  }

  closeEye(cy1) {
    if (cy1 < this.cy) {
      this.speed = 0;
    }
  }

  animate(ctx) {
    this.cy1 += this.speed;
    this.cy2 -= this.speed;
    ctx.save();

    this.openEye(this.cy1, this.cy2);
    this.closeEye(this.cy1, this.cy2);

    ctx.fillStyle = "#00ff00";

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.moveTo(this.sx, this.sy);

    ctx.quadraticCurveTo(this.cx, this.cy1, this.dx, this.dy);

    ctx.lineTo(this.dx, this.ty);
    ctx.lineTo(this.sx, this.ty);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.moveTo(this.sx, this.sy);

    ctx.quadraticCurveTo(this.cx, this.cy2, this.dx, this.dy);

    ctx.lineTo(this.dx, this.by);
    ctx.lineTo(this.sx, this.by);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
