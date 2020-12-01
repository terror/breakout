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

        constructor(slider: Slider) {
            this.slider = slider;
        }

        play() {
            this.slider.draw();
        }

        update() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.play();
        }
    }

    class Slider {
        public size: Size = { width: 100, height: 10 };
        public pos: Position = { x: canvas.height, y: canvas.width / 2 };

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

    class Block {}

    class Ball {}

    const game: Game = new Game(new Slider());
    game.play();

    /* --- Event Listeners --- */
    canvas.addEventListener('mousemove', (e) => {
        const x: number = e.clientX,
            y = e.clientY;
        game.slider.pos.x = x - game.slider.size.width / 2;
        game.slider.pos.y = Math.min(
            Math.max(canvas.height - 20, y),
            canvas.height - 20
        );
        game.update();
    });
});
