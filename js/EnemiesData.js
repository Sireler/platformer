var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./PositionsData/BlocksData"], function (require, exports, BlocksData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnemiesData = /** @class */ (function (_super) {
        __extends(EnemiesData, _super);
        function EnemiesData() {
            var _this = _super.call(this) || this;
            _this.calculate();
            return _this;
        }
        // calculate Y position
        EnemiesData.prototype.calculate = function () {
            this.data.forEach(function (obj) {
                obj.y -= 50;
            });
        };
        return EnemiesData;
    }(BlocksData_1.BlocksData));
    exports.EnemiesData = EnemiesData;
});
//# sourceMappingURL=EnemiesData.js.map