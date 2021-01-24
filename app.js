import { Card } from "./card.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.tmpCanvas = document.createElement("canvas");
    this.tmpCtx = this.tmpCanvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.card = new Card();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);
    this.cards = [];

    this.cardSize = 100;

    this.isLoaded = false;
    this.imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.image = new Image();
    this.image.src = "this_is_not_a_pipe_bg.png";
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
    this.canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.image.width / this.image.height;

    this.imgPos.width = this.stageWidth;
    this.imgPos.height = this.stageHeight;

    if (imgRatio > stageRatio) {
      this.imgPos.width = Math.round(
        this.image.width * (this.stageHeight / this.image.height)
      );
      this.imgPos.x = Math.round((this.stageWidth - this.imgPos.width) / 2);
    } else {
      this.imgPos.height = Math.round(
        this.image.height * (this.stageWidth / this.image.width)
      );

      this.imgPos.y = Math.round((this.stageHeight - this.imgPos.height) / 2);
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

    this.drawCards();
  }

  drawCards() {
    this.points = [];

    this.columns = Math.ceil(this.stageWidth / this.cardSize);
    this.rows = Math.ceil(this.stageHeight / this.cardSize);

    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    for (let i = 0; i < this.rows; i++) {
      const y = i * this.cardSize;
      const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

      for (let j = 0; j < this.columns; j++) {
        const x = j * this.cardSize;
        const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

        const card = new Card(this.image, pixelX, pixelY, this.cardSize);

        this.cards.push(card);
      }
    }
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    if (this.isLoaded) {
      this.drawImage();
    }
    window.requestAnimationFrame(this.animate.bind(this));
    this.cards.length > 0 && this.cards[0].animate(this.tmpCtx);
  }

  onClick(e) {
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
