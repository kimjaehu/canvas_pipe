import { Eyelid } from "./eyelid.js";

export class EyeController {
  constructor() {
    this.totalEyelids = 2;

    this.eyelids = [];

    if (this.eyelids.length == 1) {
      this.cy = this.stageHeight - 1;
      this.py = this.stageHeight;
    } else {
      this.cy = 1;
      this.py = 0;
    }
    console.log(this.cy, this.py, this.stageWidth, this.stageHeight);
    this.eyelids.push(
      new Eyelid(this.cy, this.py, this.stageWidth, this.stageHeight)
    );
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.eyelids = [];
  }

  addEyelid() {
    if (this.eyelids.length == 1) {
      this.cy = this.stageHeight - 1;
      this.py = this.stageHeight;
    } else {
      this.cy = 1;
      this.py = 0;
    }
    console.log(this.cy, this.py, this.stageWidth, this.stageHeight);
    this.eyelids.push(
      new Eyelid(this.cy, this.py, this.stageWidth, this.stageHeight)
    );
  }

  draw(ctx) {
    if (this.eyelids.length < 2) {
      this.addEyelid();
    }
    for (let i = this.totalEyelids - 1; i >= 0; i--) {
      console.log(this.eyelids);
      const eyelid = this.eyelids[i];
      if (eyelid.cy == 0 || eyelid.cy == this.stageHeight) {
        this.eyelids.splice(i, 1);
      } else {
        eyelid.animate(ctx);
      }
    }
  }
}
