import { Game, Slider, Ball, Size } from './common';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const score = document.getElementById('score') as HTMLCanvasElement;
const lives = document.getElementById('lives') as HTMLCanvasElement;

document.addEventListener('DOMContentLoaded', () => {
    const size: Size = {
        width: 10 << 7,
        height: 750,
    };

    (canvas.width = size.width), (canvas.height = size.height);

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

    const game: Game = new Game(new Slider(), new Ball());

    // Begin game
    game.play();

    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(score, lives);
    };

    animate();
});

export { canvas, context };
