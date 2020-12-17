import { Position, Size, context } from './common';

class Block {
    public pos: Position = {
        x: 0,
        y: 0,
    };

    public size: Size = {
        width: 100,
        height: 10,
    };

    private colors: number[] = [
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
    ];

    constructor(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    draw() {
        context.beginPath();
        context.fillStyle = `rgb(${this.colors[0]}, ${this.colors[1]}, ${this.colors[2]})`;
        context.fillRect(
            this.pos.x,
            this.pos.y,
            this.size.width,
            this.size.height
        );
        context.closePath();
    }
}

export default Block;
