import {
    Slider,
    Ball,
    Block,
    Sound,
    Sounds,
    canvas,
    context,
    endScreen,
    gameContainer,
    endScore,
    endScreenMessage,
} from './common';

class Game {
    public slider: Slider;
    public gameOver: boolean;
    public sound: Sound;

    private ball: Ball;
    private blocks: Block[] = [];
    private score: number;
    private lives: number;

    private sounds: Sounds = {
        endSound: './sounds/fail.mp3',
        hitSound: './sounds/hit.mp3',
        winSound: './sounds/complete.mp3',
        lostSound: './sounds/lost.mp3',
        bonusSound: './sounds/bonus.mp3',
    };

    constructor(slider: Slider, ball: Ball, sound: Sound) {
        (this.slider = slider), (this.ball = ball), (this.sound = sound);
        (this.score = 0), (this.lives = 3), (this.gameOver = false);
        this.sound = sound;
        this.gameOver = false;
        this.populateBlocks();
        this.ball.position(this.randomBlockColor());
    }

    // Simulate a delay for ball hit
    async delay(ms: number): Promise<void> {
        await new Promise((res: any) => setTimeout(() => res(), ms)).then(() =>
            console.log('hit!')
        );
    }

    // Reset all game stats
    reset(): void {
        this.lives = 3;
        this.score = 0;
        this.gameOver = false;
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

    // Game loop
    play(): void {
        this.slider.draw();
        this.ball.draw();

        if (this.blocks.length == 0) {
            // Game won
            this.gameOver = true;
            this.sound.play(this.sounds['winSound']);
            gameContainer.style.display = 'none';
            endScreen.style.display = 'flex';
            endScore.innerHTML = this.score.toString();
            endScreenMessage.innerHTML = 'You Win!';
            return;
        }

        if (this.ball.pos.y > canvas.height) {
            // Game over
            if (this.lives - 1 == 0) {
                gameContainer.style.display = 'none';
                endScreen.style.display = 'flex';
                endScore.innerHTML = this.score.toString();
                this.sound.play(this.sounds['endSound']);
                this.gameOver = true;
                return;
            }

            this.sound.play(this.sounds['lostSound']);
            --this.lives;
            this.ball.position(this.randomBlockColor());
        }

        if (this.checkCollision(this.ball, this.slider)) {
            this.sound.play(this.sounds['hitSound']);
            this.ball.speed.dy = -this.ball.speed.dy;
        }

        for (let i = 0; i < this.blocks.length; ++i) {
            this.blocks[i].draw();
            let bonus: boolean = false;
            if (this.checkCollision(this.ball, this.blocks[i])) {
                if (this.checkColors(this.ball, this.blocks[i])) {
                    this.sound.play(this.sounds['bonusSound']);
                    (this.lives += 1), (this.score += 5);
                    bonus = true;
                }
                (this.ball.speed.dy = -this.ball.speed.dy), this.delay(1000);
                if(!bonus) 
                    this.sound.play(this.sounds['hitSound']);
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

    // Relfect score and lives stats to DOM
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

    // Checks for same color between a (ball, block)
    checkColors(ball: Ball, block: Block): boolean {
        return (
            ball.colors[0] == block.colors[0] &&
            ball.colors[1] == block.colors[1] &&
            ball.colors[2] == block.colors[2]
        );
    }

    // Get random color from array of blocks
    randomBlockColor(): number[] {
        let colors: number[][] = [];
        for (let i = 0; i < this.blocks.length; ++i) {
            colors.push(this.blocks[i].colors);
        }
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

export default Game;
