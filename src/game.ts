import { Slider, Ball, Block, canvas, context } from './common';

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

export default Game;
