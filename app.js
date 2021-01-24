class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.card = new Card();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    window.requestAnimationFrame(this.animate.bind(this));
    this.canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  onClick(e) {
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
