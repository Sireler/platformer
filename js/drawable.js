define(["require", "exports", "./Position"], function (require, exports, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Drawable = /** @class */ (function () {
        function Drawable(src) {
            this.texture = new Image();
            this.texture.src = src;
            this.position = new Position_1.ObjectPosition();
            this.size = null;
            this.cameraC = 1;
        }
        Drawable.prototype.draw = function (ctx, camera) {
            if (!this.size) {
                ctx.drawImage(this.texture, this.position.x - camera.position.x * this.cameraC, this.position.y - camera.position.y * this.cameraC);
            }
            else {
                ctx.drawImage(this.texture, this.position.x - camera.position.x * this.cameraC, this.position.y - camera.position.y * this.cameraC, this.size.width, this.size.height);
            }
        };
        return Drawable;
    }());
    exports.Drawable = Drawable;
});
//# sourceMappingURL=drawable.js.map