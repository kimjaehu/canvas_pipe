import { Card } from "./card.js";
import { Logo } from "./logo.js";

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

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.logo = new Logo();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.cards = [];
    this.cardSize = 75;
    this.imageNum = 0;
    this.cur = 0;

    this.isLoaded = false;
    this.isPressed = false;
    this.imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    // this.images = [];
    // for (var i = 0; i <= 8; i++) {
    //
    // }

    this.image = new Image();
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

    this.logo.resize(this.canvas.width, this.canvas.height);
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    window.requestAnimationFrame(this.animate.bind(this));
    // this.canvas.addEventListener("click", this.onClick.bind(this), false);
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

    this.imgData = this.ctx.getImageData(
      0,
      0,
      this.stageWidth,
      this.stageHeight
    );

    this.getCards();
  }

  getCards() {
    this.cards = [];

    this.columns = Math.ceil(this.stageWidth / this.cardSize);
    this.rows = Math.ceil(this.stageHeight / this.cardSize);

    for (let i = 0; i < this.rows; i++) {
      const y = i * this.cardSize + this.cardSize;
      const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

      for (let j = 0; j < this.columns; j++) {
        const x = j * this.cardSize;
        const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

        const size = Math.floor(Math.random() * this.cardSize + this.cardSize);

        const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
        const red = this.imgData.data[pixelIndex + 0];
        const green = this.imgData.data[pixelIndex + 1];
        const blue = this.imgData.data[pixelIndex + 2];
        const alpha = this.imgData.data[pixelIndex + 3];

        const card = new Card(x, y, size, red, green, blue, alpha);
        this.cards.push(card);
      }
    }
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    if (this.isPressed) {
      if (this.cards.length > 0) {
        let randomCard = Math.floor(Math.random() * this.cards.length);

        const card = this.cards[randomCard];
        card.animate(this.ctx);
        this.logo.draw(this.ctx, card);
      }
    } else {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.logo.standBy(this.ctx);
    }
  }

  onDown(e) {
    this.isPressed = true;
    this.image.src = `image_${this.imageNum}.jpg`;
    this.imageNum++;
    if (this.imageNum > 6) {
      this.imageNum = 0;
    }
  }
  onMove(e) {}
  onUp(e) {
    this.isPressed = false;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }
}

window.onload = () => {
  new App();
};
