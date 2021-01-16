export class Paint {
  constructor() {
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
      this.draw();
    };
  }

  resize() {
    if (this.isLoaded) {
      this.draw();
    }
  }

  draw() {}
}
