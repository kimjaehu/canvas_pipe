import { Dot } from "./dot.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.tmpCanvas = document.createElement("canvas");
    this.tmpCtx = this.tmpCanvas.getContext("2d");

    this.background = document.createElement("img");
    this.background.className = "background";
    this.background.src = "./this_is_not_a_pipe_bg.png";
    document.body.appendChild(this.background);

    this.video = document.createElement("video");
    this.video.className = "video";
    this.video.src = "running.mp4";
    this.video.controls = true;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.height = 1280;
    this.video.width = 720;

    document.body.appendChild(this.video);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.radius = 10;
    this.pixelSize = 30;
    this.dots = [];

    this.cur = 0;

    this.isLoaded = false;
    this.videoLoaded = false;

    this.imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.videoElem = document.querySelector(".video");
    this.videoElem.addEventListener("canplaythrough", this.animate.bind(this));

    // this.image = new Image();
    // this.image.onload = () => {
    //   this.isLoaded = true;
    //   // this.getCards();
    // };
    // this.image.src = "starry_night_full.jpg";
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    window.requestAnimationFrame(this.animate.bind(this));
    // this.canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.videoElem.width / this.videoElem.height;

    this.imgPos.width = this.stageWidth;
    this.imgPos.height = this.stageHeight;

    if (imgRatio > stageRatio) {
      this.imgPos.width = Math.round(
        this.videoElem.width * (this.stageHeight / this.videoElem.height)
      );
      this.imgPos.x = Math.round((this.stageWidth - this.imgPos.width) / 2);
    } else {
      this.imgPos.height = Math.round(
        this.videoElem.height * (this.stageWidth / this.videoElem.width)
      );

      this.imgPos.y = Math.round((this.stageHeight - this.imgPos.height) / 2);
    }

    // this.ctx.drawImage(
    //   this.videoElem,
    //   0,
    //   0,
    //   this.videoElem.width,
    //   this.videoElem.height,

    //   this.imgPos.x,
    //   this.imgPos.y,
    //   this.imgPos.width,
    //   this.imgPos.height
    // );

    this.tmpCtx.drawImage(
      this.videoElem,
      0,
      0,
      this.videoElem.width,
      this.videoElem.height,

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

    this.drawDots();
  }

  drawDots() {
    this.dots = [];
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

        const dot = new Dot(
          x,
          y,
          this.radius,
          this.pixelSize,
          red,
          green,
          blue
        );

        this.dots.push(dot);
      }
    }
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.drawImage();
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];

      dot.animate(this.ctx);
    }
  }

  onClick(e) {
    // window.requestAnimationFrame(this.animate.bind(this));
    // this.cards.push(new Card(this.image, e.offsetX, e.offsetY, 1));
  }
}

window.onload = () => {
  new App();
};
