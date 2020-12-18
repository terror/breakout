import { Slider, Ball, Block, canvas, context } from './common';

class Game {
    public slider: Slider;
    private ball: Ball;
    private blocks: Block[] = [];
    private score: number;
    private lives: number;

    constructor(slider: Slider, ball: Ball) {
        this.slider = slider;
        this.ball = ball;
        this.score = 0;
        this.lives = 3;
        this.populateBlocks();
    }

    async delay(ms: number) {
        await new Promise((res: any) => setTimeout(() => res(), ms)).then(() =>
            console.log('hit!')
        );
    }

    // (Re)populates the array of block objects
    populateBlocks() {
        for (let i = 1; i <= 5; ++i) {
            for (let j = 1; j <= 5; ++j) {
                this.blocks.push(new Block((i * canvas.width) / 5, j * 30));
            }
        }
    }

    play() {
        this.slider.draw();
        this.ball.draw();

        if (this.ball.pos.y > canvas.height) {
            if (this.lives - 1 == 0) {
                // Game over
            }
            --this.lives;
            this.blocks.length = 0;
            this.populateBlocks();
            this.ball.position();
        }

        if (this.checkCollision(this.ball, this.slider)) {
            this.ball.speed.dy = -this.ball.speed.dy;
        }

        for (let i = 0; i < this.blocks.length; ++i) {
            this.blocks[i].draw();
            if (this.checkCollision(this.ball, this.blocks[i])) {
                this.ball.speed.dy = -this.ball.speed.dy;
                this.delay(1000);
                (this.blocks[i].size.width = 0),
                    (this.blocks[i].size.height = 0);
                ++this.score;
            }
        }
        this.filter();
    }

    // Filters out blocks with widths equal to 0
    filter() {
        this.blocks = this.blocks.filter((v: Block) => v.size.width !== 0);
    }

    update(score: HTMLCanvasElement, lives: HTMLCanvasElement) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        score.innerHTML = this.score.toString();
        lives.innerHTML = this.lives.toString();
        this.play();
    }

    // Checks for a collision with a (ball, object)
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

export default Game;
