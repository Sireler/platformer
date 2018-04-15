define(["require", "exports", "./position"], function (require, exports, position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DrawableSet = /** @class */ (function () {
        function DrawableSet(srcs) {
            this.srcs = srcs;
            this.position = new position_1.ObjectPosition();
            this.size = null;
            this.textures = {};
        }
        // Создание и загрузка изображений
        DrawableSet.prototype.loadTextures = function () {
            for (var name in this.srcs) {
                this.textures[name] = new Image();
                this.textures[name].src = this.srcs[name];
            }
        };
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