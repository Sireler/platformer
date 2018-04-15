define(["require", "exports", "./background"], function (require, exports, background_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Game = /** @class */ (function () {
        function Game(screen) {
            this.FPS = 60;
            this.SCREEN_WIDTH = 800;
            this.SCREEN_HEIGHT = 600;
            this.MAX_Y = 500;
            var FPS = 60;
            this.screen = screen;
            screen.width = 800;
            screen.height = 600;
            this.background = [];
            this.ctx = screen.getContext("2d");
            this.loadBackground();
            this.start();
        }
        Game.prototype.start = function () {
            var _this = this;
            this.interval = window.setInterval(function () {
                _this.ctx.clearRect(0, 0, _this.SCREEN_WIDTH, _this.SCREEN_HEIGHT);
                _this.background.forEach(function (el) {
                    el.draw(_this.ctx);
                });
            }, 1000 / this.FPS);
        };
        Game.prototype.loadBackground = function () {
            this.background.push(new background_1.Background('sprites/bg_sky.png'));
            this.background.push(new background_1.Background('sprites/bg_forest_1.png'));
            this.background.push(new background_1.Background('sprites/bg_forest_2.png'));
            this.background.push(new background_1.Background('sprites/bg_ground.png'));
        };
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map