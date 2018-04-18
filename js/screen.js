define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * To store current size of the canvas
     */
    var Screen = /** @class */ (function () {
        function Screen(width, height) {
            if (width === void 0) { width = 800; }
            if (height === void 0) { height = 600; }
            this.width = width;
            this.height = height;
        }
        return Screen;
    }());
    exports.Screen = Screen;
});
//# sourceMappingURL=Screen.js.map