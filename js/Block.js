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
define(["require", "exports", "./Draw/Drawable", "./Size"], function (require, exports, Drawable_1, Size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Block = /** @class */ (function (_super) {
        __extends(Block, _super);
        function Block(position) {
            var _this = _super.call(this, 'sprites/block.png') || this;
            _this.position = position;
            _this.size = new Size_1.Size(32, 32);
            return _this;
        }
        return Block;
    }(Drawable_1.Drawable));
    exports.Block = Block;
});
//# sourceMappingURL=Block.js.map