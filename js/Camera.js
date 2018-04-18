define(["require", "exports", "./Position"], function (require, exports, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Camera for track the player
     */
    var Camera = /** @class */ (function () {
        function Camera() {
            this.position = new Position_1.ObjectPosition();
        }
        return Camera;
    }());
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map