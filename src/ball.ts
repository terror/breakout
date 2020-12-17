import { Position, Speed, canvas, context } from './common';

class Ball {
    public radius: number = 10;
    public pos: Position = {
        x: 5,
        y: 5,
    };
    public speed: Speed = {
        dx: 5,
        dy: 5,
    };

    constructor() {}

    draw() {
        this.checkBounds();

        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI << 1);
        context.fill();
        context.closePath();

        this.pos.x += this.speed.dx;
        this.pos.y += this.speed.dy;
    }

    checkBounds() {
        if (this.pos.x < 0 || this.pos.x > canvas.width)
            this.speed.dx = -this.speed.dx;
        if (this.pos.y < 0) this.speed.dy = -this.speed.dy;
    }
}

export default Ball;
