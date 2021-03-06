var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Draw/DrawableSet", "./Size", "./Position", "./Ball"], function (require, exports, DrawableSet_1, Size_1, Position_1, Ball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = /** @class */ (function (_super) {
        __extends(Character, _super);
        function Character(srcs) {
            var _this = _super.call(this, srcs) || this;
            _this.size = new Size_1.Size(32, 32);
            _this.speed = 3;
            _this.jumpPower = 10;
            _this.direction = "right";
            _this.stands = false;
            _this.attackCooldown = 30;
            _this.attackCooldownDelta = 0;
            _this.team = "alliers";
            _this.radius = _this.size.width / 2 - 4;
            _this.ballsprite = 'sprites/waterball.png';
            _this.impulse = new Position_1.ObjectPosition(0, 0);
            _this.loadTextures();
            return _this;
        }
        Object.defineProperty(Character.prototype, "feetPosition", {
            // Getting center of the bottom point of object
            get: function () {
                return new Position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Character.prototype, "center", {
            // Getting center of object
            get: function () {
                return new Position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        // checking the contact of objects
        Character.prototype.checkHit = function (ch) {
            if (this.team == ch.team) {
                return false;
            }
            var distance = this.center.distance(ch.center);
            if ((this.radius + ch.radius) > distance) {
                return true;
            }
            else {
                return false;
            }
        };
        // Drawing object into a canvas
        Character.prototype.draw = function (ctx, camera) {
            _super.prototype.draw.call(this, ctx, this.direction, camera);
        };
        /**
         *
         * @param {Ball[]} balls - Game.balls
         *
         */
        Character.prototype.attack = function (balls) {
            if (this.attackCooldown > this.attackCooldownDelta) {
                return;
            }
            else {
                this.attackCooldownDelta = 0;
            }
            var b = new Ball_1.Ball(this.ballsprite);
            balls.push(b);
            b.position = this.position.clone();
            b.team = this.team;
            if (this.direction == "right") {
                b.impulse.move(10, -8);
                b.position.move((this.size.width - b.size.width), 0);
            }
            else {
                b.impulse.move(-10, -8);
            }
        };
        /**
         *
         * @param {PhysicParams} phys - Game.PHYS
         * @param {number} groundY - Game.MAX_Y
         * @param blocks - Game.blocks
         */
        Character.prototype.update = function (phys, groundY, blocks) {
            this.impulse.y += phys.gravity;
            this.impulse.x *= phys.windage;
            if (Math.abs(this.impulse.x) < 0.1) {
                this.impulse.x = 0;
            }
            this.stands = false;
            if (this.feetPosition.y > groundY) {
                this.position.y = groundY - this.size.height;
                if (Math.abs(this.impulse.y) < 2) {
                    this.impulse.y = 0;
                }
                this.stands = true;
            }
            this.attackCooldownDelta++;
            this.position.move(this.impulse.x, this.impulse.y);
            this.stands = false;
            if (this.feetPosition.y > groundY) {
                this.position.y = groundY - this.size.height;
                this.impulse.y = 0;
                this.stands = true;
            }
            else {
                for (var i = 0; i < blocks.length; i++) {
                    var b = blocks[i];
                    if (!b) {
                        continue;
                    }
                    if (b.position.x > this.feetPosition.x) {
                        continue;
                    }
                    if (b.position.x + b.size.width < this.feetPosition.x) {
                        continue;
                    }
                    var maxY = this.feetPosition.y;
                    var minY = maxY - this.impulse.y;
                    if (b.position.y > maxY || b.position.y < minY) {
                        continue;
                    }
                    this.position.y = b.position.y - this.size.height;
                    this.stands = true;
                    this.impulse.y = 0;
                }
            }
        };
        Character.prototype.isMovedByUser = function (keyboard, balls) {
            // key: 65 - 'A'
            if (keyboard.isPressed(65)) {
                this.moveLeft();
            }
            // key: 68 - 'D'
            if (keyboard.isPressed(68)) {
                this.moveRight();
            }
            // key: 32 - 'SPACE'
            if (keyboard.isPressed(32)) {
                this.jump();
            }
            if (keyboard.isPressed(87)) {
                this.attack(balls);
            }
        };
        Character.prototype.jump = function () {
            if (!this.stands)
                return;
            this.impulse.y = -this.jumpPower;
        };
        Character.prototype.moveLeft = function () {
            this.direction = "left";
            this.position.x -= this.speed;
        };
        Character.prototype.moveRight = function () {
            this.direction = "right";
            this.position.x += this.speed;
        };
        return Character;
    }(DrawableSet_1.DrawableSet));
    exports.Character = Character;
});
//# sourceMappingURL=Character.js.map