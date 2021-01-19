class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.isLoaded = false;

    this.image = new Image();
    this.image.src = "this_is_not_a_pipe.png";
    this.image.onload = () => {
      this.isLoaded = true;
      this.drawImage();
    };
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    if (this.isLoaded) {
      this.drawImage();
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.image.height / this.image.width;
    const imgWidth =
      stageRatio > 1 ? this.stageWidth / 3 : this.stageWidth / 1.5;
    const imgHeight = imgWidth * imgRatio;

    const imgPosX = Math.round(this.stageWidth / 2 - imgWidth / 2);
    const imgPosY = Math.round(this.stageHeight / 2 - imgHeight / 2);

    this.ctx.drawImage(this.image, imgPosX, imgPosY, imgWidth, imgHeight);

    this.imgData = this.ctx.getImageData(imgPosX, imgPosY, imgWidth, imgHeight);
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    console.log(this.imgData);
  }
}

window.onload = () => {
  new App();
};
