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
define(["require", "exports", "./Enemy", "./Size"], function (require, exports, Enemy_1, Size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnemyRanger = /** @class */ (function (_super) {
        __extends(EnemyRanger, _super);
        function EnemyRanger(position, blocks, balls) {
            var _this = _super.call(this, {
                right: "sprites/enemy1.png",
                left: "sprites/enemy2.png"
            }) || this;
            _this.size = new Size_1.Size(32, 32);
            _this.position = position;
            _this.speed = 2;
            _this.blocks = blocks;
            _this.balls = balls;
            return _this;
        }
        EnemyRanger.prototype.move = function (blocks) {
            var y = this.feetPosition.y;
            if (this.direction == "right") {
                var x = this.feetPosition.x + this.speed;
            }
            else {
                var x = this.feetPosition.x - this.speed;
            }
            var flag = false;
            for (var i = 0; i < blocks.length; i++) {
                var b = blocks[i];
                if (!b) {
                    continue;
                }
                if (x < b.position.x) {
                    continue;
                }
                if (x > b.position.x + this.size.width) {
                    continue;
                }
                var by = b.position.y;
                if (by > y - 1 && by < y + 1) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                if (this.direction == "right") {
                    this.direction = "left";
                }
                else {
                    this.direction = "right";
                }
            }
            if (this.direction == "right") {
                this.moveRight();
            }
            else {
                this.moveLeft();
            }
            this.attackCooldown = 90;
            this.team = "enemy";
        };
        EnemyRanger.prototype.ai = function () {
            this.move(this.blocks);
            this.attack(this.balls);
        };
        EnemyRanger.prototype.update = function (gravity, groundY, blocks) {
            _super.prototype.update.call(this, gravity, groundY, blocks);
            this.ai();
        };
        return EnemyRanger;
    }(Enemy_1.Enemy));
    exports.EnemyRanger = EnemyRanger;
});
//# sourceMappingURL=EnemyRanger.js.map