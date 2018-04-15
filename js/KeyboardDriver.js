define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var KeyboardDriver = /** @class */ (function () {
        function KeyboardDriver() {
            var _this = this;
            this.keys = {};
            document.addEventListener('keydown', function (e) {
                _this.keys[e.keyCode] = true;
            });
            document.addEventListener('keyup', function (e) {
                _this.keys[e.keyCode] = false;
            });
        }
        KeyboardDriver.prototype.isPressed = function (key) {
            return this.keys[key];
        };
        return KeyboardDriver;
    }());
    exports.KeyboardDriver = KeyboardDriver;
});
//# sourceMappingURL=KeyboardDriver.js.map