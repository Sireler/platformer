define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeleportsData = /** @class */ (function () {
        function TeleportsData() {
            // (x,y) - position to draw (place of teleport)
            // (toX, toY) - where will be teleported
            this.data = [
                {
                    x: 200,
                    y: 450,
                    toX: 500,
                    toY: 150
                },
                {
                    x: 750,
                    y: 0,
                    toX: 1300,
                    toY: -200
                }
            ];
        }
        return TeleportsData;
    }());
    exports.TeleportsData = TeleportsData;
});
//# sourceMappingURL=TeleportsData.js.map