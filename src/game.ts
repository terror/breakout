import {
    Slider,
    Ball,
    Block,
    Sound,
    canvas,
    context,
    endScreen,
    gameContainer,
    endScore,
} from './common';

class Game {
    public slider: Slider;
    private ball: Ball;
    public sound: Sound;
    private blocks: Block[] = [];
    private score: number;
    private lives: number;

    constructor(slider: Slider, ball: Ball, sound: Sound) {
        this.slider = slider;
        this.ball = ball;
        this.sound = sound;
        this.score = 0;
        this.lives = 3;
        this.populateBlocks();
    }

    async delay(ms: number): Promise<void> {
        await new Promise((res: any) => setTimeout(() => res(), ms)).then(() =>
            console.log('hit!')
        );
    }

    reset(): void {
        this.lives = 3;
        this.score = 0;
        this.blocks.length = 0;
        this.populateBlocks();
    }

    // (Re)populates the array of block objects
    populateBlocks(): void {
        for (let i = 1; i <= 5; ++i) {
            for (let j = 1; j <= 5; ++j) {
                this.blocks.push(new Block((i * canvas.width) / 6, j * 30));
            }
        }
    }

    play(): void {
        this.slider.draw();
        this.ball.draw();

        if (this.ball.pos.y > canvas.height) {
            // Game over
            if (this.lives - 1 == 0) {
                gameContainer.style.display = 'none';
                endScreen.style.display = 'flex';
                endScore.innerHTML = this.score.toString();
            }
            --this.lives;
            this.ball.position();
        }

        if (this.checkCollision(this.ball, this.slider)) {
            this.sound.play();
            this.ball.speed.dy = -this.ball.speed.dy;
        }

        for (let i = 0; i < this.blocks.length; ++i) {
            this.blocks[i].draw();
            if (this.checkCollision(this.ball, this.blocks[i])) {
                this.ball.speed.dy = -this.ball.speed.dy;
                this.delay(1000);
                this.sound.play();
                (this.blocks[i].size.width = 0),
                    (this.blocks[i].size.height = 0);
                ++this.score;
            }
        }
        this.filter();
    }

    // Filters out blocks with widths equal to 0
    filter(): void {
        this.blocks = this.blocks.filter((v: Block) => v.size.width !== 0);
    }

    update(score: HTMLCanvasElement, lives: HTMLCanvasElement): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
        score.innerHTML = this.score.toString();
        lives.innerHTML = this.lives.toString();
        this.play();
    }

    // Checks for a collision with a (ball, object)
    checkCollision(ball: Ball, obj: any): boolean {
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

export default Game;
