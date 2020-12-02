"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    var size = {
        width: 10 << 7,
        height: 750,
    };
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    (canvas.width = size.width), (canvas.height = size.height);
    // --- Game state logic ---
    var Game = /** @class */ (function () {
        function Game(slider, ball, blocks) {
            this.slider = slider;
            this.ball = ball;
            this.blocks = blocks;
        }
        Game.prototype.play = function () {
            this.slider.draw();
            this.ball.draw();
            if (this.checkCollision(this.ball, this.slider)) {
                this.ball.speed.dy = -this.ball.speed.dy;
            }
            for (var i = 0; i < this.blocks.length; ++i) {
                this.blocks[i].draw();
                if (this.checkCollision(this.ball, this.blocks[i])) {
                    this.ball.speed.dy = -this.ball.speed.dy;
                    (this.blocks[i].size.width = 0),
                        (this.blocks[i].size.height = 0);
                }
            }
            this.filter();
        };
        Game.prototype.filter = function () {
            this.blocks = this.blocks.filter(function (v) { return v.size.width !== 0; });
        };
        Game.prototype.update = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.play();
        };
        Game.prototype.checkCollision = function (ball, obj) {
            var dX = Math.abs(ball.pos.x - obj.pos.x - (obj.size.width >> 1)), dY = Math.abs(ball.pos.y - obj.pos.y - (obj.size.height >> 1));
            if (dY > (obj.size.height >> 1) + ball.radius)
                return false;
            if (dX > (obj.size.width >> 1) + ball.radius)
                return false;
            if (dY <= obj.size.height >> 1)
                return true;
            if (dX <= obj.size.width >> 1)
                return true;
            return true;
        };
        return Game;
    }());
    var Slider = /** @class */ (function () {
        function Slider() {
            this.size = { width: 100, height: 10 };
            this.pos = { x: canvas.width >> 1, y: canvas.height - 20 };
        }
        Slider.prototype.draw = function () {
            context.beginPath();
            context.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
            context.stroke();
            context.fill();
            context.closePath();
        };
        return Slider;
    }());
    var Block = /** @class */ (function () {
        function Block(x, y) {
            this.pos = { x: 0, y: 0 };
            this.size = { width: 100, height: 10 };
            this.colors = [
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
            ];
            this.pos.x = x;
            this.pos.y = y;
        }
        Block.prototype.draw = function () {
            context.beginPath();
            context.fillStyle = "rgb(" + this.colors[0] + ", " + this.colors[1] + ", " + this.colors[2] + ")";
            context.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
            context.closePath();
        };
        return Block;
    }());
    var Ball = /** @class */ (function () {
        function Ball() {
            this.radius = 10;
            this.pos = {
                x: 5,
                y: 5,
            };
            this.speed = {
                dx: 5,
                dy: 5,
            };
        }
        Ball.prototype.draw = function () {
            this.checkBounds();
            context.beginPath();
            context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI << 1);
            context.fill();
            context.closePath();
            this.pos.x += this.speed.dx;
            this.pos.y += this.speed.dy;
        };
        Ball.prototype.checkBounds = function () {
            if (this.pos.x < 0 || this.pos.x > canvas.width)
                this.speed.dx = -this.speed.dx;
            if (this.pos.y < 0)
                this.speed.dy = -this.speed.dy;
        };
        return Ball;
    }());
    // Populate blocks array
    var blocks = [];
    for (var i = 1; i <= 5; ++i) {
        for (var j = 1; j <= 5; ++j) {
            blocks.push(new Block((i * canvas.width) / 5, j * 30));
        }
    }
    var game = new Game(new Slider(), new Ball(), blocks);
    // --- Event Listeners ---
    canvas.addEventListener('mousemove', function (e) {
        var x = e.clientX, y = e.clientY;
        console.log(x, y);
        game.slider.pos.x = x - (game.slider.size.width >> 1);
        game.slider.pos.y = Math.min(Math.max(canvas.height - 20, y), canvas.height - 20);
    });
    // Begin game
    game.play();
    var animate = function () {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
    };
    animate();
});
