define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectPosition = /** @class */ (function () {
        function ObjectPosition(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.set(x, y);
        }
        // change position to x and y
        ObjectPosition.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        // move position to x and y
        ObjectPosition.prototype.move = function (x, y) {
            this.x = this.x + x;
            this.y = this.y + y;
        };
        // getting the distance to the object (pos)
        ObjectPosition.prototype.distance = function (pos) {
            return Math.sqrt((this.x - pos.x) * (this.x - pos.x) + (this.y - pos.y) * (this.y - pos.y));
        };
        ObjectPosition.prototype.clone = function () {
            return new ObjectPosition(this.x, this.y);
        };
        // normalization position for display background
        ObjectPosition.prototype.normalize = function (screenSize) {
            this.x = (this.x % screenSize.width) % screenSize.width;
            this.y = (this.y % screenSize.height) % screenSize.height;
        };
        return ObjectPosition;
    }());
    exports.ObjectPosition = ObjectPosition;
});
//# sourceMappingURL=Position.js.map