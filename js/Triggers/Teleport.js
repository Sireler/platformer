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
    var Teleport = /** @class */ (function (_super) {
        __extends(Teleport, _super);
        function Teleport(position, moveTo) {
            var _this = _super.call(this, position, new Size_1.Size(32, 32)) || this;
            _this.moveTo = moveTo;
            _this.drawable = new Drawable_1.Drawable('sprites/portal.png');
            _this.drawable.position = _this.position;
            _this.drawable.size = _this.size;
            return _this;
        }
        // Action in contact with trigger
        Teleport.prototype.onTrigger = function (obj) {
            obj.position.set(this.moveTo.x, this.moveTo.y);
        };
        return Teleport;
    }(Trigger_1.Trigger));
    exports.Teleport = Teleport;
});
//# sourceMappingURL=Teleport.js.map