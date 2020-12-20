import { Position, Speed, canvas, context } from './common';

class Ball {
    public radius: number = 10;

    public pos: Position = {
        x: this.randX(),
        y: this.randY(),
    };

    public speed: Speed = {
        dx: 5,
        dy: 5,
    };

    constructor() {}

    draw(): void {
        this.checkBounds();

        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI << 1);
        context.fill();
        context.closePath();

        this.pos.x += this.speed.dx;
        this.pos.y += this.speed.dy;
    }

    checkBounds(): void {
        if (
            this.pos.x - this.radius < 0 ||
            this.pos.x + this.radius > canvas.width
        )
            this.speed.dx = -this.speed.dx;
        if (this.pos.y - this.radius < 0) this.speed.dy = -this.speed.dy;
    }

    randX(): number {
        return this.radius + Math.random() * (canvas.width - this.radius * 2);
    }

    randY(): number {
        return this.radius + Math.random() * (canvas.height - this.radius * 2);
    }

    position(): void {
        this.pos.x = this.randX();
        this.pos.y = this.randY();
    }
}

export default Ball;
