"use strict";
exports.__esModule = true;
document.addEventListener('DOMContentLoaded', function () {
    var size = {
        width: 1000,
        height: 750
    };
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    (canvas.width = size.width), (canvas.height = size.height);
    /* --- Game state logic --- */
    var Game = /** @class */ (function () {
        function Game(slider) {
            this.slider = slider;
        }
        Game.prototype.play = function () {
            this.slider.draw();
        };
        Game.prototype.update = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.play();
        };
        return Game;
    }());
    var Slider = /** @class */ (function () {
        function Slider() {
            this.size = { width: 100, height: 10 };
            this.pos = { x: canvas.height, y: canvas.width / 2 };
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
        function Block() {
        }
        return Block;
    }());
    var Ball = /** @class */ (function () {
        function Ball() {
        }
        return Ball;
    }());
    var game = new Game(new Slider());
    game.play();
    /* --- Event Listeners --- */
    canvas.addEventListener('mousemove', function (e) {
        var x = e.clientX, y = e.clientY;
        game.slider.pos.x = x - game.slider.size.width / 2;
        game.slider.pos.y = Math.min(Math.max(canvas.height - 20, y), canvas.height - 20);
        game.update();
    });
});
