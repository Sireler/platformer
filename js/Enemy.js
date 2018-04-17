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
define(["require", "exports", "./character"], function (require, exports, character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(srcs) {
            var _this = _super.call(this, srcs) || this;
            _this.ballsprite = "sprites/plazmaball.png";
            return _this;
        }
        return Enemy;
    }(character_1.Character));
    exports.Enemy = Enemy;
});
//# sourceMappingURL=Enemy.js.map