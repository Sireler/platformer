define(["require", "exports", "../Position"], function (require, exports, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DrawableSet = /** @class */ (function () {
        function DrawableSet(srcs) {
            this.srcs = srcs;
            this.position = new Position_1.ObjectPosition();
            this.size = null;
            this.textures = {};
        }
        // Creating and loading images
        DrawableSet.prototype.loadTextures = function () {
            for (var name in this.srcs) {
                this.textures[name] = new Image();
                this.textures[name].src = this.srcs[name];
            }
        };
        // Drawing object into a canvas
        DrawableSet.prototype.draw = function (ctx, name, camera) {
            if (!this.size) {
                ctx.drawImage(this.textures[name], this.position.x - camera.position.x, this.position.y - camera.position.y);
            }
            else {
                ctx.drawImage(this.textures[name], this.position.x - camera.position.x, this.position.y - camera.position.y, this.size.width, this.size.height);
            }
        };
        return DrawableSet;
    }());
    exports.DrawableSet = DrawableSet;
});
//# sourceMappingURL=DrawableSet.js.map