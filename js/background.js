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
define(["require", "exports", "./drawable", "./size", "./screen"], function (require, exports, drawable_1, size_1, screen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background(src) {
            var _this = _super.call(this, src) || this;
            _this.screenSize = new screen_1.Screen();
            _this.size = new size_1.Size(_this.screenSize.width, _this.screenSize.height);
            return _this;
        }
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
    }(drawable_1.Drawable));
    exports.Background = Background;
});
//# sourceMappingURL=background.js.map