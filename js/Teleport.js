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
define(["require", "exports", "./Trigger", "./size", "./drawable"], function (require, exports, Trigger_1, size_1, drawable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Teleport = /** @class */ (function (_super) {
        __extends(Teleport, _super);
        function Teleport(position, moveTo) {
            var _this = _super.call(this, position, new size_1.Size(32, 32)) || this;
            _this.moveTo = moveTo;
            _this.drawable = new drawable_1.Drawable('sprites/portal.png');
            _this.drawable.position = _this.position;
            _this.drawable.size = _this.size;
            return _this;
        }
        Teleport.prototype.onTrigger = function (obj) {
            obj.position.set(this.moveTo.x, this.moveTo.y);
        };
        return Teleport;
    }(Trigger_1.Trigger));
    exports.Teleport = Teleport;
});
//# sourceMappingURL=Teleport.js.map