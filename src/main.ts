import { Size, Position, Speed } from './interfaces';

document.addEventListener('DOMContentLoaded', () => {
    const size: Size = {
        width: 10 << 7,
        height: 750,
    };

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    (canvas.width = size.width), (canvas.height = size.height);

    // --- Game state logic ---
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

            if (this.checkCollision(this.ball, this.slider)) {
                this.ball.speed.dy = -this.ball.speed.dy;
            }

            for (let i = 0; i < this.blocks.length; ++i) {
                this.blocks[i].draw();
                if (this.checkCollision(this.ball, this.blocks[i])) {
                    this.ball.speed.dy = -this.ball.speed.dy;
                    (this.blocks[i].size.width = 0),
                        (this.blocks[i].size.height = 0);
                }
            }
            this.filter();
        }

        filter() {
            this.blocks = this.blocks.filter((v: Block) => v.size.width !== 0);
        }

        update() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.play();
        }

        checkCollision(ball: Ball, obj: any) {
            const dX: number = Math.abs(
                    ball.pos.x - obj.pos.x - (obj.size.width >> 1)
                ),
                dY: number = Math.abs(
                    ball.pos.y - obj.pos.y - (obj.size.height >> 1)
                );

            if (dY > (obj.size.height >> 1) + ball.radius) return false;
            if (dX > (obj.size.width >> 1) + ball.radius) return false;

            if (dY <= obj.size.height >> 1) return true;
            if (dX <= obj.size.width >> 1) return true;

            return true;
        }
    }

    class Slider {
        public size: Size = { width: 100, height: 10 };
        public pos: Position = { x: canvas.width >> 1, y: canvas.height - 20 };

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
        public size: Size = { width: 100, height: 10 };
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

    // Populate blocks array
    let blocks: Block[] = [];
    for (let i = 1; i <= 5; ++i) {
        for (let j = 1; j <= 5; ++j) {
            blocks.push(new Block((i * canvas.width) / 5, j * 30));
        }
    }

    const game: Game = new Game(new Slider(), new Ball(), blocks);

    // --- Event Listeners ---
    canvas.addEventListener('mousemove', (e) => {
        const x: number = e.clientX,
            y: number = e.clientY;
        game.slider.pos.x = x - (game.slider.size.width >> 1);
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
