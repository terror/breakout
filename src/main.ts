import { Block, Game, Slider, Ball, Size } from './common';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

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

    // Populate blocks array
    let blocks: Block[] = [];
    for (let i = 1; i <= 5; ++i) {
        for (let j = 1; j <= 5; ++j) {
            blocks.push(new Block((i * canvas.width) / 5, j * 30));
        }
    }

    const game: Game = new Game(new Slider(), new Ball(), blocks);

    // Begin game
    game.play();

    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
    };

    animate();
});

export { canvas, context };
