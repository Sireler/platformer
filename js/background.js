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
define(["require", "exports", "./Draw/Drawable", "./Size", "./Screen"], function (require, exports, Drawable_1, Size_1, Screen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background(src) {
            var _this = _super.call(this, src) || this;
            _this.screenSize = new Screen_1.Screen();
            _this.size = new Size_1.Size(_this.screenSize.width, _this.screenSize.height);
            return _this;
        }
        // Drawing object into a canvas
        Background.prototype.draw = function (ctx, camera) {
            this.position.normalize(this.screenSize);
            var offsetX = camera.position.x * this.cameraC;
            offsetX = offsetX - (offsetX % this.screenSize.width);
            this.position.x = offsetX;
            _super.prototype.draw.call(this, ctx, camera);
            this.position.x -= this.screenSize.width;
            _super.prototype.draw.call(this, ctx, camera);
            this.position.x += this.screenSize.width * 2;
            _super.prototype.draw.call(this, ctx, camera);
        };
        return Background;
    }(Drawable_1.Drawable));
    exports.Background = Background;
});
//# sourceMappingURL=Background.js.map