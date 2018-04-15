define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Size = /** @class */ (function () {
        function Size(width, height) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.width = width;
            this.height = height;
        }
        Size.prototype.set = function (width, height) {
            this.width = width;
            this.height = height;
        };
        Size.prototype.isset = function () {
            return this.width != 0 ? true : false;
        };
        return Size;
    }());
    exports.Size = Size;
});
//# sourceMappingURL=size.js.map