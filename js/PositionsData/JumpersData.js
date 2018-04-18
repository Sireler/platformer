define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JumpersData = /** @class */ (function () {
        function JumpersData() {
            // (x,y) - position to draw
            // (impulseX, impulseY) - impulse to drop
            this.data = [
                {
                    x: 600,
                    y: 470,
                    impulseX: 0,
                    impulseY: -20
                },
                {
                    x: 1070,
                    y: -65,
                    impulseX: -25,
                    impulseY: -25
                }
            ];
        }
        return JumpersData;
    }());
    exports.JumpersData = JumpersData;
});
//# sourceMappingURL=JumpersData.js.map