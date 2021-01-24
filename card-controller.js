import { Card } from "./card.js";

export class CardController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "this_is_not_a_pipe_bg.png";

    this.cards = [];

    this.cur = 0;
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
  }

  addCard(x, y, cardSize, red, green, blue) {
    this.cards.push(new Card(this.img, x, y, cardSize, red, green, blue));
  }

  animate(ctx, point) {
    const card = new Card(
      this.img,
      point.x,
      point.y,
      point.cardSize,
      point.red,
      point.green,
      point.blue
    );

    card.animate(ctx);
  }
}
