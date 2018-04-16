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
define(["require", "exports", "./drawable", "./size"], function (require, exports, drawable_1, size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Block = /** @class */ (function (_super) {
        __extends(Block, _super);
        function Block(position) {
            var _this = _super.call(this, 'sprites/block.png') || this;
            _this.position = position;
            _this.size = new size_1.Size(32, 32);
            return _this;
        }
        return Block;
    }(drawable_1.Drawable));
    exports.Block = Block;
});
//# sourceMappingURL=Block.js.map