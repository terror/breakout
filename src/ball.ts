import { Position, Speed, canvas, context } from './common';

class Ball {
  public radius: number = 10;

  public pos: Position = {
    x: canvas.width >> 1,
    y: canvas.height >> 1,
  };

  public speed: Speed = {
    dx: 5,
    dy: 5,
  };

  public colors: number[] = [];

  constructor() {}

  draw(): void {
    this.checkBounds();

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI << 1);
    context.fillStyle = `rgb(${this.colors[0]}, ${this.colors[1]}, ${this.colors[2]})`;
    context.fill();
    context.closePath();

    this.pos.x += this.speed.dx;
    this.pos.y += this.speed.dy;
  }

  checkBounds(): void {
    if (this.pos.x - this.radius < 0 || this.pos.x + this.radius > canvas.width)
      this.speed.dx = -this.speed.dx;
    if (this.pos.y - this.radius < 0) this.speed.dy = -this.speed.dy;
  }

  position(colors: number[]): void {
    (this.pos.x = canvas.width >> 1), (this.pos.y = canvas.height >> 1);
    this.colors = colors;
  }
}

export default Ball;
