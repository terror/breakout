import { Size, Position } from './interfaces';

document.addEventListener('DOMContentLoaded', () => {
    const size: Size = {
        width: 1000,
        height: 750,
    };

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    (canvas.width = size.width), (canvas.height = size.height);

    /* --- Game state logic --- */
    class Game {
        public slider: Slider;
        private ball: Ball;
        private blocks: Block[];

        constructor(slider: Slider, ball: Ball, blocks: Block[]) {
            this.slider = slider;
            this.ball = ball;
            this.blocks = blocks;
        }

        play() {
            this.slider.draw();
            this.ball.draw();
            for (let i = 0; i < this.blocks.length; ++i) {
                for (let j = 0; j < this.blocks.length; ++j) {
                    this.blocks[i].draw();
                }
            }
        }

        update() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.play();
        }
    }

    class Slider {
        public size: Size = { width: 100, height: 10 };
        public pos: Position = { x: canvas.width / 2, y: canvas.height - 20 };

        constructor() {}

        draw() {
            context.beginPath();
            context.rect(
                this.pos.x,
                this.pos.y,
                this.size.width,
                this.size.height
            );
            context.stroke();
            context.fill();
            context.closePath();
        }
    }

    class Block {
        public pos: Position = { x: 0, y: 0 };
        private size: Size = { width: 100, height: 10 };
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

    class Ball {
        private radius: number = 10;
        private pos: Position = {
            x: 5,
            y: 5,
        };
        private speed = {
            dx: 5,
            dy: 5,
        };

        constructor() {}

        draw() {
            this.checkBounds();

            context.beginPath();
            context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            this.pos.x += this.speed.dx;
            this.pos.y += this.speed.dy;
        }

        checkBounds() {
            if (this.pos.x < 0 || this.pos.x > canvas.width)
                this.speed.dx = -this.speed.dx;
            if (this.pos.y < 0 || this.pos.y > canvas.height)
                this.speed.dy = -this.speed.dy;
        }
    }

    // Populate blocks array
    let blocks: Block[] = [];
    for (let i = 1; i <= 5; ++i) {
        for (let j = 1; j <= 5; ++j) {
            blocks.push(new Block((i * canvas.width) / 5, j * 30));
        }
    }

    const game: Game = new Game(new Slider(), new Ball(), blocks);

    /* --- Event Listeners --- */
    canvas.addEventListener('mousemove', (e) => {
        const x: number = e.clientX,
            y: number = e.clientY;
        game.slider.pos.x = x - game.slider.size.width / 2;
        game.slider.pos.y = Math.min(
            Math.max(canvas.height - 20, y),
            canvas.height - 20
        );
    });

    // Begin game
    game.play();

    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
    };

    animate();
});
