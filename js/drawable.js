define(["require", "exports", "./position"], function (require, exports, position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Drawable = /** @class */ (function () {
        function Drawable(src) {
            this.texture = new Image();
            this.texture.src = src;
            this.position = new position_1.ObjectPosition();
            this.size = null;
        }
        Drawable.prototype.draw = function (ctx) {
            if (!this.size) {
                ctx.drawImage(this.texture, this.position.x, this.position.y);
            }
            else {
                ctx.drawImage(this.texture, this.position.x, this.position.y, this.size.width, this.size.height);
            }
        };
        return Drawable;
    }());
    exports.Drawable = Drawable;
});
//# sourceMappingURL=drawable.js.map