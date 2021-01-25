import { Card } from "./card.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.background = document.createElement("img");
    this.background.className = "background";
    this.background.src = "./this_is_not_a_pipe_bg.png";
    document.body.appendChild(this.background);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // document.addEventListener("pointerdown", this.onDown.bind(this), false);
    // document.addEventListener("pointermove", this.onMove.bind(this), false);
    // document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.cardSize = 100;
    this.cards = [];

    this.cur = 0;

    this.isLoaded = false;
    this.imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.image = new Image();
    this.image.src = "starry_night_full.jpg";
    this.image.onload = () => {
      this.isLoaded = true;
      this.getCards();
    };
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    if (this.isLoaded) {
      this.getCards();
    }

    window.requestAnimationFrame(this.animate.bind(this));
    this.canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  getCards() {
    this.cards = [];

    this.columns = Math.ceil(this.stageWidth / this.cardSize);
    this.rows = Math.ceil(this.stageHeight / this.cardSize);

    for (let i = 0; i < this.rows; i++) {
      const y = 0;

      for (let j = 0; j < this.columns; j++) {
        const x = j * this.cardSize;

        const card = new Card(this.image, x, y, this.cardSize);

        this.cards.push(card);
      }
    }
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    let cardY = 0;

    console.log();

    if (this.cur < this.cards.length) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.cards[this.cur].draw(this.ctx);
      cardY = this.cards[this.cur].animate(this.ctx);
    }

    if (cardY > this.stageHeight) {
      this.cur++;
      console.log(cardY);
    }
    console.log(this.cur);
  }

  onClick(e) {
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
