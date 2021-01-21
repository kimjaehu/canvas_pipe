import { Drop } from "./drop.js";
import { Pixel } from "./pixel.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.tmpCanvas = document.createElement("canvas");
    this.tmpCtx = this.tmpCanvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.drop = new Drop();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.width = 10;
    this.pixelSize = 50;
    this.pixels = [];

    this.isLoaded = false;
    this.imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

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

    this.tmpCanvas.width = this.stageWidth;
    this.tmpCanvas.height = this.stageHeight;

    this.drop.resize(this.stageWidth, this.stageHeight);

    if (this.isLoaded) {
      this.drawImage();
    }
    window.requestAnimationFrame(this.animate.bind(this));
    this.canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.image.width / this.image.height;

    if (stageRatio < 1) {
      this.imgPos.width = this.stageWidth / 1.5;
      this.imgPos.height = this.imgPos.width * imgRatio;
    } else {
      this.imgPos.width = this.stageWidth / 3;
      this.imgPos.height = this.imgPos.width * imgRatio;
    }

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,

      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    this.tmpCtx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,

      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    this.imgData = this.tmpCtx.getImageData(
      0,
      0,
      this.stageWidth,
      this.stageHeight
    );
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.drawPixels();
  }

  drawPixels() {
    this.pixels = [];

    this.columns = Math.ceil(this.stageWidth / this.pixelSize);
    this.rows = Math.ceil(this.stageHeight / this.pixelSize);

    for (let i = 0; i < this.rows; i++) {
      const y = (i + 0.5) * this.pixelSize;
      const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

      for (let j = 0; j < this.columns; j++) {
        const x = (j + 0.5) * this.pixelSize;
        const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

        const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
        const red = this.imgData.data[pixelIndex + 0];
        const green = this.imgData.data[pixelIndex + 1];
        const blue = this.imgData.data[pixelIndex + 2];

        const pixel = new Pixel(x, y, this.pixelSize, red, green, blue);

        this.pixels.push(pixel);
      }
    }
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    // for (let i = 0; i < this.pixels.length; i++) {
    //   const pixel = this.pixels[i];

    //   pixel.animate(this.ctx);
    // }
  }

  onClick(e) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,

      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );
  }
}

window.onload = () => {
  new App();
};
