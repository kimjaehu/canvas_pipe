export class Logo {
  constructor() {
    this.logo = new Path2D(
      "M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"
    );
    this.alpha = 0;
    this.text = "THIS IS NIKE.";
    this.fontSize = 60;
    this.speed = 0.001;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx, card) {
    this.alpha < 1 && (this.alpha += 0.001);
    this.alpha > 1 && (this.alpha = 1);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.shadowColor = `rgb(${card.red},${card.green},${card.blue})`;
    ctx.strokeStyle = `rgb(${card.red},${card.green},${card.blue})`;
    ctx.translate(this.stageWidth * 0.5 - 300, this.stageHeight * 0.5 - 200);
    ctx.scale(this.stageWidth * 0.004, this.stageWidth * 0.004);
    ctx.fill(this.logo);

    
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    // ctx.font = `${this.fontSize}px 'Nunito Sans', sans-serif`;
    // ctx.textAlign = "center";
    // ctx.fillText(this.text, this.stageWidth * 0.5, this.stageHeight * 0.5);
    ctx.restore();
  }

  standBy(ctx) {
    this.alpha < 0.3 ? (this.alpha += this.speed) : (this.alpha = 0);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.translate(this.stageWidth * 0.5 - 300, this.stageHeight * 0.5 - 200);
    ctx.scale(this.stageWidth * 0.004, this.stageWidth * 0.004);
    ctx.fill(this.logo);
    ctx.restore();
  }
}
