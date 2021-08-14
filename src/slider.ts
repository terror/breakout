import { Size, Position, canvas, context } from './common';

class Slider {
  public size: Size = {
    width: 100,
    height: 10,
  };

  public pos: Position = {
    x: canvas.width >> 1,
    y: canvas.height - 20,
  };

  constructor() {}

  draw(): void {
    context.beginPath();
    context.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    context.stroke();
    context.fill();
    context.closePath();
  }
}

export default Slider;
