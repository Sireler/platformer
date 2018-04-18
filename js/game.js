define(["require", "exports", "./Background", "./Screen", "./Character", "./KeyboardDriver", "./Camera", "./PhysicParams", "./Block", "./Position", "./PositionsData/BlocksData", "./EnemyRanger", "./PositionsData/EnemiesData", "./Triggers/Teleport", "./PositionsData/TeleportsData", "./PositionsData/JumpersData", "./Triggers/Jumper"], function (require, exports, Background_1, Screen_1, Character_1, KeyboardDriver_1, Camera_1, PhysicParams_1, Block_1, Position_1, BlocksData_1, EnemyRanger_1, EnemiesData_1, Teleport_1, TeleportsData_1, JumpersData_1, Jumper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Game = /** @class */ (function () {
        function Game(screen) {
            this.FPS = 30;
            this.MAX_Y = 500;
            this.screenSize = new Screen_1.Screen();
            this.keyboard = new KeyboardDriver_1.KeyboardDriver();
            this.camera = new Camera_1.Camera();
            this.PHYS = new PhysicParams_1.PhysicParams();
            this.balls = [];
            this.blocks = [];
            this.enemies = [];
            this.triggers = [];
            this.screen = screen;
            screen.width = this.screenSize.width;
            screen.height = this.screenSize.height;
            this.background = {};
            // Создание персонажа
            this.character = new Character_1.Character({
                left: 'sprites/man_left.png',
                right: 'sprites/man_right.png'
            });
            this.character.position.set(400, 300);
            //---
            this.ctx = screen.getContext("2d");
            this.loadBackground();
            this.loadBlocks();
            this.loadEnemies();
            this.loadTriggers();
            this.start();
        }
        // Начало игры
        Game.prototype.start = function () {
            var _this = this;
            this.interval = window.setInterval(function () {
                _this.clearCanvas();
                _this.drawBackground();
                _this.moveCharacter();
                _this.ballsColision();
                _this.enemiesCollision();
                _this.triggersCollision();
                _this.drawObjects();
                _this.moveCamera();
            }, 1000 / this.FPS);
        };
        // Конец игры
        Game.prototype.end = function () {
            clearInterval(this.interval);
            window.location.reload();
        };
        // Камера, отслеживание персонажа
        Game.prototype.moveCamera = function () {
            this.camera.position.x = this.character.position.x - this.screenSize.width / 2 + this.character.size.width / 2;
            if (this.character.position.y < this.screenSize.height / 2) {
                this.camera.position.y = this.character.position.y - this.screenSize.height / 2 + this.character.size.height / 2;
            }
        };
        // Взаимодействие с персонажем, обновление
        Game.prototype.moveCharacter = function () {
            this.character.isMovedByUser(this.keyboard, this.balls);
            this.character.update(this.PHYS, this.MAX_Y, this.blocks);
        };
        Game.prototype.ballsColision = function () {
            var _this = this;
            this.balls.forEach(function (b, i) {
                b.update(_this.PHYS, _this.MAX_Y, _this.blocks);
                if (b.timeToLife <= 0) {
                    delete _this.balls[i];
                }
                if (b.checkHit(_this.character)) {
                    _this.end();
                }
                _this.enemies.forEach(function (e, j) {
                    if (b.checkHit(e)) {
                        delete _this.enemies[j];
                        delete _this.balls[i];
                    }
                });
            });
        };
        Game.prototype.triggersCollision = function () {
            var _this = this;
            this.triggers.forEach(function (t) {
                t.checkHit(_this.character);
                _this.enemies.forEach(function (e) {
                    t.checkHit(e);
                });
                _this.balls.forEach(function (b) {
                    t.checkHit(b);
                });
            });
        };
        Game.prototype.enemiesCollision = function () {
            var _this = this;
            this.enemies.forEach(function (enemy, k) {
                if (_this.character.checkHit(enemy)) {
                    delete _this.enemies[k];
                    _this.end();
                }
                enemy.update(_this.PHYS, _this.MAX_Y, _this.blocks);
            });
        };
        Game.prototype.clearCanvas = function () {
            this.ctx.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
        };
        // Отрисовка объектов игры
        Game.prototype.drawObjects = function () {
            var _this = this;
            this.blocks.forEach(function (block) {
                block.draw(_this.ctx, _this.camera);
            });
            this.balls.forEach(function (ball) {
                ball.draw(_this.ctx, _this.camera);
            });
            this.enemies.forEach(function (enemy) {
                enemy.draw(_this.ctx, _this.camera);
            });
            this.triggers.forEach(function (trigger) {
                trigger.draw(_this.ctx, _this.camera);
            });
            this.character.draw(this.ctx, this.camera);
        };
        // Отрисовка фона
        Game.prototype.drawBackground = function () {
            for (var key in this.background) {
                this.background[key].draw(this.ctx, this.camera);
            }
        };
        Game.prototype.createBlock = function (position) {
            this.blocks.push(new Block_1.Block(position));
        };
        Game.prototype.createEnemyRanger = function (position) {
            this.enemies.push(new EnemyRanger_1.EnemyRanger(position, this.blocks, this.balls));
        };
        Game.prototype.createTrigger = function (type, position, arg) {
            var obj;
            switch (type) {
                case 'Teleport':
                    obj = new Teleport_1.Teleport(position, arg);
                    break;
                case 'Jumper':
                    obj = new Jumper_1.Jumper(position, arg);
                    break;
            }
            this.triggers.push(obj);
        };
        Game.prototype.loadTriggers = function () {
            var _this = this;
            var teleports = new TeleportsData_1.TeleportsData();
            teleports.data.forEach(function (teleport) {
                _this.createTrigger('Teleport', new Position_1.ObjectPosition(teleport.x, teleport.y), new Position_1.ObjectPosition(teleport.toX, teleport.toY));
            });
            var jumpers = new JumpersData_1.JumpersData();
            jumpers.data.forEach(function (jumper) {
                _this.createTrigger('Jumper', new Position_1.ObjectPosition(jumper.x, jumper.y), new Position_1.ObjectPosition(jumper.impulseX, jumper.impulseY));
            });
        };
        Game.prototype.loadEnemies = function () {
            var _this = this;
            var enemies = new EnemiesData_1.EnemiesData();
            enemies.data.forEach(function (enemy) {
                _this.createEnemyRanger(new Position_1.ObjectPosition(enemy.x, enemy.y));
            });
        };
        Game.prototype.loadBlocks = function () {
            var _this = this;
            var blocks = new BlocksData_1.BlocksData();
            blocks.data.forEach(function (block) {
                _this.createBlock(new Position_1.ObjectPosition(block.x, block.y));
            });
        };
        Game.prototype.loadBackground = function () {
            this.background.sky = new Background_1.Background('sprites/bg_sky.png');
            this.background.sky.cameraC = 0;
            this.background.forest1 = new Background_1.Background('sprites/bg_forest_1.png');
            this.background.forest1.cameraC = 0.05;
            this.background.forest2 = new Background_1.Background('sprites/bg_forest_2.png');
            this.background.forest2.cameraC = 0.1;
            this.background.ground = new Background_1.Background('sprites/bg_ground.png');
        };
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map