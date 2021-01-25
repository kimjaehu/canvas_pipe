import { Card } from "./card.js";

export class CardController {
  constructor() {
    this.cards = [];

    this.cardSize = 100;

    this.cur = 0;
    this.isLoaded = false;

    this.img = new Image();
    this.img.src = "this_is_not_a_pipe_bg.png";
    this.img.onload = () => {
      this.isLoaded = true;
      this.getCoordinates();
    };
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    if (this.isLoaded) {
      this.getCoordinates();
    }
  }

  getCoordinates() {
    this.columns = Math.ceil(this.stageWidth / this.cardSize);
    this.rows = Math.ceil(this.stageHeight / this.cardSize);

    for (let i = 0; i < this.rows; i++) {
      const y = i * this.cardSize;
      const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

      for (let j = 0; j < this.columns; j++) {
        const x = j * this.cardSize;
        const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

        const card = new Card(this.img, pixelX, pixelY, this.cardSize);

        this.cards.push(card);
      }
    }
  }

  loaded() {
    this.isLoaded = true;
  }

  animate(ctx) {
    if (this.cards.length > 0) {
      const cardY = this.cards[this.cur].animate(ctx);

      cardY > this.stageHeight && this.cur++;

      console.log(this.cur, cardY, this.stageHeight);
    }

    // for (let i = 0; i < this.cards.length; i++) {
    //   const card = this.cards[i];
    //   card.animate(ctx);
    // }
  }
}
