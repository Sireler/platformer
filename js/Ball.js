var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Draw/Drawable", "./Size", "./Position"], function (require, exports, Drawable_1, Size_1, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ball = /** @class */ (function (_super) {
        __extends(Ball, _super);
        function Ball(src, fps) {
            if (fps === void 0) { fps = 30; }
            var _this = _super.call(this, src) || this;
            _this.size = new Size_1.Size(16, 16);
            _this.impulse = new Position_1.ObjectPosition();
            _this.bounce = 0.7;
            _this.timeToLife = fps * 5;
            _this.radius = _this.size.width / 2;
            _this.team = null;
            return _this;
        }
        Object.defineProperty(Ball.prototype, "feetPosition", {
            get: function () {
                return new Position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "center", {
            get: function () {
                return new Position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Ball.prototype.checkHit = function (ch) {
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
        // groundY: Game.MAX_Y
        // phys: Game.PHYS
        // blocks: Game.blocks
        Ball.prototype.update = function (phys, groundY, blocks) {
            this.timeToLife--;
            this.position.move(this.impulse.x, this.impulse.y);
            this.impulse.y += phys.gravity;
            this.impulse.x *= phys.windage;
            if (Math.abs(this.impulse.x) < 0.1) {
                this.impulse.x = 0;
            }
            if (this.feetPosition.y > groundY) {
                this.position.y = groundY - this.size.height;
                this.impulse.y = this.impulse.y * this.bounce * -1;
                if (Math.abs(this.impulse.y) < 2) {
                    this.impulse.y = 0;
                }
            }
            else {
                if (this.impulse.y > 0) {
                    if (this.impulse.y > 0) {
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
                            this.position.y = this.impulse.y = this.impulse.y * this.bounce * -1;
                            if (Math.abs(this.impulse.y) < 2) {
                                this.impulse.y = 0;
                            }
                            ;
                            this.impulse.y = 0;
                        }
                    }
                }
            }
        };
        return Ball;
    }(Drawable_1.Drawable));
    exports.Ball = Ball;
});
//# sourceMappingURL=Ball.js.map