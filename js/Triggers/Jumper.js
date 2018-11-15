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
define(["require", "exports", "./Trigger", "../Size", "../Draw/Drawable"], function (require, exports, Trigger_1, Size_1, Drawable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Jumper = /** @class */ (function (_super) {
        __extends(Jumper, _super);
        function Jumper(position, impulse) {
            var _this = _super.call(this, position, new Size_1.Size(32, 32)) || this;
            _this.drawable = new Drawable_1.Drawable('sprites/jumper.png');
            _this.impulse = impulse;
            _this.drawable.position = _this.position;
            _this.drawable.size = _this.size;
            return _this;
        }
        // Action in contact with trigger
        Jumper.prototype.onTrigger = function (obj) {
            obj.impulse.set(this.impulse.x, this.impulse.y);
        };
        return Jumper;
    }(Trigger_1.Trigger));
    exports.Jumper = Jumper;
});
//# sourceMappingURL=Jumper.js.map