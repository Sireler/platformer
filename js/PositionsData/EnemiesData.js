var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./BlocksData"], function (require, exports, BlocksData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnemiesData = /** @class */ (function (_super) {
        __extends(EnemiesData, _super);
        function EnemiesData() {
            var _this = _super.call(this) || this;
            // exclusion of enemy creation on the block
            _this.except = [
                {
                    x: 1210,
                    y: 50
                },
                {
                    x: 1070,
                    y: -50
                },
                {
                    x: 332,
                    y: 400
                },
            ];
            _this.calculate();
            return _this;
        }
        // calculate Y position and check except (to draw enemies)
        EnemiesData.prototype.calculate = function () {
            var _this = this;
            this.data.forEach(function (obj, i) {
                _this.except.forEach(function (exc) {
                    if (obj.x == exc.x && obj.y == exc.y) {
                        delete _this.data[i];
                    }
                });
                obj.y -= 50;
            });
        };
        return EnemiesData;
    }(BlocksData_1.BlocksData));
    exports.EnemiesData = EnemiesData;
});
//# sourceMappingURL=EnemiesData.js.map