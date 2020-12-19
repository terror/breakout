import { Game, Slider, Ball, Size, Sound } from './common';

/* UI Elements */
const canvas = document.getElementById('canvas') as HTMLCanvasElement,
    context = canvas.getContext('2d') as CanvasRenderingContext2D,
    score = document.getElementById('score') as HTMLCanvasElement,
    lives = document.getElementById('lives') as HTMLCanvasElement,
    startBtn = document.getElementById('start') as HTMLCanvasElement,
    gameContainer = document.getElementById('game') as HTMLCanvasElement,
    startScreen = document.getElementById('start-screen') as HTMLCanvasElement,
    endScreen = document.getElementById('end-screen') as HTMLCanvasElement,
    endScore = document.getElementById('end-score') as HTMLCanvasElement;

startBtn.addEventListener('click', () => {
    gameContainer.style.display = 'block';
    startScreen.style.display = 'none';

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

    const game: Game = new Game(
        new Slider(),
        new Ball(),
        new Sound('./sounds/hit.mp3')
    );
    game.reset();

    // Begin game
    game.play();

    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(score, lives);
    };

    animate();
});

export { canvas, context, endScreen, gameContainer, endScore };
