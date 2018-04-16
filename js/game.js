define(["require", "exports", "./background", "./screen", "./character", "./KeyboardDriver", "./Camera"], function (require, exports, background_1, screen_1, character_1, KeyboardDriver_1, Camera_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Game = /** @class */ (function () {
        function Game(screen) {
            this.FPS = 25;
            this.MAX_Y = 500;
            // Физика
            this.PHYS = {
                gravity: 0.4,
                windage: 1 - 0.04
            };
            this.screenSize = new screen_1.Screen();
            this.keyboard = new KeyboardDriver_1.KeyboardDriver();
            this.camera = new Camera_1.Camera();
            this.balls = [];
            this.screen = screen;
            screen.width = this.screenSize.width;
            screen.height = this.screenSize.height;
            this.background = {};
            // Создание персонажа
            this.character = new character_1.Character({
                left: 'sprites/man_left.png',
                right: 'sprites/man_right.png'
            });
            this.character.position.set(400, 300);
            //---
            this.ctx = screen.getContext("2d");
            this.loadBackground();
            this.start();
        }
        Game.prototype.start = function () {
            var _this = this;
            this.interval = window.setInterval(function () {
                _this.ctx.clearRect(0, 0, _this.screenSize.width, _this.screenSize.height);
                // Draw background
                for (var key in _this.background) {
                    _this.background[key].draw(_this.ctx, _this.camera);
                }
                //this.background.sky.position.x += 2;
                // ---
                _this.character.isMovedByUser(_this.keyboard, _this.balls);
                _this.character.update(_this.PHYS['gravity'], _this.MAX_Y);
                _this.character.draw(_this.ctx, _this.camera);
                _this.balls.forEach(function (b, i) {
                    b.update(_this.PHYS, _this.MAX_Y);
                    if (b.timeToLife <= 0) {
                        delete _this.balls[i];
                    }
                    if (b.checkHit(_this.character)) {
                        alert('GameOver');
                        clearInterval(_this.interval);
                        window.location.reload();
                    }
                });
                _this.balls.forEach(function (b) {
                    b.draw(_this.ctx, _this.camera);
                });
                _this.camera.position.x = _this.character.position.x - _this.screenSize.width / 2 + _this.character.size.width / 2;
                if (_this.character.position.y < _this.screenSize.height / 2) {
                    _this.camera.position.y = _this.character.position.y - _this.screenSize.height / 2 + _this.character.size.height / 2;
                }
            }, 1000 / this.FPS);
        };
        //
        Game.prototype.loadBackground = function () {
            this.background.sky = new background_1.Background('sprites/bg_sky.png');
            this.background.sky.cameraC = 0;
            this.background.forest1 = new background_1.Background('sprites/bg_forest_1.png');
            this.background.forest1.cameraC = 0.05;
            this.background.forest2 = new background_1.Background('sprites/bg_forest_2.png');
            this.background.forest2.cameraC = 0.1;
            this.background.ground = new background_1.Background('sprites/bg_ground.png');
        };
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map